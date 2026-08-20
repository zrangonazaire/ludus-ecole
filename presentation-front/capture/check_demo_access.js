const puppeteer = require('puppeteer-core');
const fs = require('fs');

const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const baseUrl = process.env.EDUOPS_CAPTURE_BASE || 'http://localhost:4200';

async function clickButton(page, label) {
  const clicked = await page.evaluate((text) => {
    const button = [...document.querySelectorAll('button')]
      .find((candidate) => candidate.textContent.trim().includes(text));
    if (!button) return false;
    button.click();
    return true;
  }, label);
  if (!clicked) throw new Error(`Bouton introuvable: ${label}`);
  await new Promise((resolve) => setTimeout(resolve, 250));
}

async function dismissCoachmark(page) {
  const button = await page.$('.coachmark__cta');
  if (!button) return;
  await button.click();
  await page.waitForSelector('.coachmark-layer', { hidden: true, timeout: 5000 });
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`${baseUrl}/commencer`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.removeItem('eduops.step-guidance.v1');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await dismissCoachmark(page);
  await page.type('[formControlName="schoolName"]', 'École témoin Accès');
  await page.type('[formControlName="city"]', 'Abidjan');
  await clickButton(page, 'Continuer');
  await dismissCoachmark(page);
  await clickButton(page, 'Continuer');
  await dismissCoachmark(page);
  await clickButton(page, 'Voir mon scénario');
  await dismissCoachmark(page);
  await page.click('a.final-button');
  await page.waitForSelector('[formControlName="schoolCode"]', { timeout: 10000 });

  const suffix = Date.now().toString().slice(-7);
  await page.type('[formControlName="schoolCode"]', `E2E-${suffix}`);
  await new Promise((resolve) => setTimeout(resolve, 600));
  await clickButton(page, 'Continuer');
  await page.waitForSelector('[formControlName="firstName"]', { timeout: 10000 });
  await page.type('[formControlName="firstName"]', 'Awa');
  await page.type('[formControlName="lastName"]', 'Test');
  await page.type('[formControlName="email"]', `awa.${suffix}@example.test`);
  await page.type('[formControlName="password"]', 'DemoAccess2026');
  await page.click('[formControlName="acceptedTerms"]');
  await new Promise((resolve) => setTimeout(resolve, 600));
  await clickButton(page, 'Creer mon etablissement');
  await page.waitForFunction(() => location.pathname === '/onboarding', { timeout: 15000 });

  await dismissCoachmark(page);
  await clickButton(page, 'Continuer');
  await dismissCoachmark(page);
  await clickButton(page, 'Continuer');
  await dismissCoachmark(page);
  await clickButton(page, 'Continuer');
  await dismissCoachmark(page);
  await clickButton(page, 'Enregistrer mon scénario');
  await page.waitForFunction(() => location.pathname === '/dashboard', { timeout: 15000 });
  const firstPath = await page.evaluate(() => location.pathname);

  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const refreshedPath = await page.evaluate(() => location.pathname);
  const dashboardVisible = Boolean(await page.$('eduops-dashboard'));
  const result = { firstPath, refreshedPath, dashboardVisible, pageErrors };
  process.stdout.write(JSON.stringify(result, null, 2));
  await browser.close();

  if (firstPath !== '/dashboard' || refreshedPath !== '/dashboard' || !dashboardVisible || pageErrors.length) {
    process.exit(1);
  }
}

main().catch((error) => {
  process.stderr.write(error.stack || error.message);
  process.exit(1);
});
