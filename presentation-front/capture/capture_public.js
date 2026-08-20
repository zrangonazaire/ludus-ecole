const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDirectory = path.join(__dirname, 'screenshots');
fs.mkdirSync(outputDirectory, { recursive: true });

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

async function inspectPage(page, name) {
  const layout = await page.evaluate(() => ({
    title: document.querySelector('h1, h2')?.textContent.trim() ?? '',
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth
  }));
  await page.screenshot({ path: path.join(outputDirectory, `${name}.png`), fullPage: true });
  return layout;
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const errors = [];
  const results = {};

  const desktop = await browser.newPage();
  desktop.on('console', (event) => {
    if (event.type() === 'error') errors.push(`console: ${event.text()}`);
  });
  desktop.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  await desktop.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
  await desktop.goto('http://127.0.0.1:4200/', { waitUntil: 'networkidle0', timeout: 60000 });
  results.landingDesktop = await inspectPage(desktop, 'public-landing-desktop');
  await desktop.click('.profile-picker button:nth-child(2)');
  results.interactiveProfile = await desktop.$eval('.console__heading h2', (element) => element.textContent.trim());
  await desktop.click('.profile-picker button:nth-child(3)');
  await desktop.click('.hero__actions a.button--primary');
  await desktop.waitForSelector('[formControlName="preset"]:checked', { timeout: 10000 });
  results.profileHandOff = await desktop.$eval(
    'label.choice-card.selected strong',
    (element) => element.textContent.trim()
  );

  const mobile = await browser.newPage();
  mobile.on('pageerror', (error) => errors.push(`mobile page: ${error.message}`));
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobile.goto('http://127.0.0.1:4200/', { waitUntil: 'networkidle0', timeout: 60000 });
  results.landingMobile = await inspectPage(mobile, 'public-landing-mobile');

  const setup = await browser.newPage();
  setup.on('pageerror', (error) => errors.push(`setup page: ${error.message}`));
  await setup.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
  await setup.goto('http://127.0.0.1:4200/commencer', { waitUntil: 'networkidle0', timeout: 60000 });
  results.setupStep1 = await inspectPage(setup, 'public-setup-step-1');
  await setup.type('[formControlName="schoolName"]', 'Groupe Scolaire Baobab');
  await setup.type('[formControlName="city"]', 'Abidjan');
  await clickButton(setup, 'Continuer');
  await clickButton(setup, 'Continuer');
  await clickButton(setup, 'Voir mon scénario');
  results.setupSummary = await inspectPage(setup, 'public-setup-summary');
  await setup.click('a.final-button');
  await setup.waitForSelector('[formControlName="schoolName"]', { timeout: 10000 });
  results.signupPrefill = await setup.evaluate(() => ({
    schoolName: document.querySelector('[formControlName="schoolName"]')?.value,
    city: document.querySelector('[formControlName="city"]')?.value,
    country: document.querySelector('[formControlName="country"]')?.value,
    currency: document.querySelector('[formControlName="currency"]')?.value,
    hasScenarioBanner: Boolean(document.querySelector('.demo-context'))
  }));
  results.signup = await inspectPage(setup, 'public-signup-prefilled');

  const setupMobile = await browser.newPage();
  await setupMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await setupMobile.goto('http://127.0.0.1:4200/commencer', { waitUntil: 'networkidle0', timeout: 60000 });
  results.setupMobile = await inspectPage(setupMobile, 'public-setup-mobile');

  await browser.close();
  const report = { results, errors };
  fs.writeFileSync(path.join(__dirname, 'public-results.json'), JSON.stringify(report, null, 2));
  process.stdout.write(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  process.stderr.write(error.stack || error.message);
  process.exit(1);
});
