const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const baseUrl = process.env.EDUOPS_CAPTURE_BASE || 'http://127.0.0.1:4200';
const screenshotDir = path.join(__dirname, 'screenshots');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function clickButton(page, label) {
  const buttons = await page.$$('button');
  for (const button of buttons) {
    const text = await button.evaluate((node) => node.textContent.trim());
    if (text.includes(label)) {
      await button.click();
      await new Promise((resolve) => setTimeout(resolve, 120));
      return;
    }
  }
  throw new Error(`Bouton introuvable: ${label}`);
}

async function coachmarkTitle(page, expected) {
  await page.waitForSelector('.coachmark-layer .coachmark', { visible: true, timeout: 5000 });
  if (expected) {
    await page.waitForFunction(
      (title) => document.querySelector('.coachmark h2')?.textContent.trim() === title,
      { timeout: 5000 },
      expected
    );
  }
  return page.$eval('.coachmark h2', (node) => node.textContent.trim());
}

async function acceptCoachmark(page) {
  await page.click('.coachmark__cta');
  await page.waitForSelector('.coachmark-layer', { hidden: true, timeout: 5000 });
}

async function main() {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => {
    localStorage.removeItem('eduops.step-guidance.v1');
    sessionStorage.clear();
  });

  await page.goto(`${baseUrl}/commencer`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const demoTitles = [];
  demoTitles.push(await coachmarkTitle(page, 'Une démo qui vous ressemble'));
  assert(demoTitles[0] === 'Une démo qui vous ressemble', 'Le conseil de la première étape est incorrect.');
  await page.screenshot({ path: path.join(screenshotDir, 'step-coachmark-desktop.png'), fullPage: true });

  assert(await page.$eval('.coachmark', (node) => document.activeElement === node), 'Le dialogue ne reçoit pas le focus initial.');
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  assert(await page.$eval('.coachmark__cta', (node) => document.activeElement === node), 'Maj+Tab ne boucle pas vers le dernier contrôle.');
  await page.keyboard.press('Tab');
  assert(await page.$eval('.coachmark__close', (node) => document.activeElement === node), 'Tab ne boucle pas vers le premier contrôle.');

  await page.keyboard.press('Escape');
  await page.waitForSelector('.coachmark-help', { visible: true });
  await page.click('.coachmark-help');
  assert(await coachmarkTitle(page) === demoTitles[0], 'Le bouton Aide ne rouvre pas le conseil.');
  await acceptCoachmark(page);
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert(await page.$eval('#setup-step-title', (node) => document.activeElement === node), 'Le CTA ne rend pas le focus au contenu de l’étape.');

  await page.type('[formControlName="schoolName"]', 'École témoin intuitive');
  await page.type('[formControlName="city"]', 'Abidjan');
  await clickButton(page, 'Continuer');
  demoTitles.push(await coachmarkTitle(page, 'Choisissez votre cap'));
  await acceptCoachmark(page);
  await clickButton(page, 'Continuer');
  demoTitles.push(await coachmarkTitle(page, 'Gardez vos habitudes'));
  await acceptCoachmark(page);
  await clickButton(page, 'Retour');
  assert(!(await page.$('.coachmark-layer')), 'Un conseil déjà lu se rouvre au retour arrière.');
  await clickButton(page, 'Continuer');
  assert(!(await page.$('.coachmark-layer')), 'Un conseil déjà lu se rouvre en avançant de nouveau.');
  await clickButton(page, 'Voir mon scénario');
  demoTitles.push(await coachmarkTitle(page, 'Votre scénario est prêt'));
  await acceptCoachmark(page);

  assert(JSON.stringify(demoTitles) === JSON.stringify([
    'Une démo qui vous ressemble',
    'Choisissez votre cap',
    'Gardez vos habitudes',
    'Votre scénario est prêt'
  ]), `Ordre des conseils démo incorrect: ${demoTitles.join(' | ')}`);

  await page.reload({ waitUntil: 'domcontentloaded' });
  assert(!(await page.$('.coachmark-layer')), 'Les conseils déjà lus réapparaissent après rechargement.');

  await page.evaluate(() => {
    localStorage.removeItem('eduops.step-guidance.v1');
    sessionStorage.setItem('eduops.accessToken', 'mock-access-token.admin');
    sessionStorage.setItem('eduops.refreshToken', 'mock-refresh-token.admin');
  });
  await page.goto(`${baseUrl}/onboarding`, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const onboardingTitles = [];
  onboardingTitles.push(await coachmarkTitle(page, 'Posez votre structure'));
  await acceptCoachmark(page);
  assert(await page.$eval('#onboarding-step-title', (node) => document.activeElement === node), 'Le focus onboarding ne revient pas au titre.');
  await clickButton(page, 'Continuer');
  onboardingTitles.push(await coachmarkTitle(page, 'Organisez vos classes'));
  await acceptCoachmark(page);
  await clickButton(page, 'Continuer');
  onboardingTitles.push(await coachmarkTitle(page, 'Adaptez votre programme'));
  await acceptCoachmark(page);
  await clickButton(page, 'Continuer');
  onboardingTitles.push(await coachmarkTitle(page, 'Préparez les échéances'));
  await page.click('.coachmark__close');
  await page.waitForSelector('.coachmark-layer', { hidden: true });

  assert(JSON.stringify(onboardingTitles) === JSON.stringify([
    'Posez votre structure',
    'Organisez vos classes',
    'Adaptez votre programme',
    'Préparez les échéances'
  ]), `Ordre des conseils onboarding incorrect: ${onboardingTitles.join(' | ')}`);

  await clickButton(page, 'Retour');
  assert(!(await page.$('.coachmark-layer')), 'Le conseil onboarding se rouvre au retour arrière.');
  await clickButton(page, 'Continuer');
  assert(!(await page.$('.coachmark-layer')), 'Le conseil onboarding se rouvre en avançant de nouveau.');

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.click('.coachmark-help');
  await page.waitForSelector('.coachmark-layer .coachmark', { visible: true });
  await new Promise((resolve) => setTimeout(resolve, 300));
  await page.screenshot({ path: path.join(screenshotDir, 'step-coachmark-mobile.png'), fullPage: false });
  const mobile = await page.$eval('.coachmark', (node) => {
    const box = node.getBoundingClientRect();
    return {
      left: box.left,
      right: box.right,
      top: box.top,
      bottom: box.bottom,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      titleId: node.getAttribute('aria-labelledby'),
      descriptionId: node.getAttribute('aria-describedby')
    };
  });
  assert(mobile.left >= 0 && mobile.right <= mobile.viewportWidth, 'Le conseil déborde horizontalement sur mobile.');
  assert(mobile.top >= 0 && mobile.bottom <= mobile.viewportHeight, 'Le conseil déborde verticalement sur mobile.');
  assert(Boolean(mobile.titleId && mobile.descriptionId), 'Les relations ARIA du dialogue sont absentes.');

  const persistedKeys = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('eduops.step-guidance.v1') || '[]')
  );
  const result = { demoTitles, onboardingTitles, persistedKeys, mobile, pageErrors };
  process.stdout.write(JSON.stringify(result, null, 2));
  await browser.close();

  assert(persistedKeys.filter((key) => key.startsWith('school-onboarding-mock-user-admin:')).length === 4,
    'Les quatre conseils onboarding ne sont pas mémorisés.');
  assert(pageErrors.length === 0, `Erreurs navigateur: ${pageErrors.join(' | ')}`);
}

main().catch((error) => {
  process.stderr.write(error.stack || error.message);
  process.exit(1);
});
