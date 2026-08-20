const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EXE = fs.existsSync(EDGE) ? EDGE : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4200';
const OUT = path.join(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });
const PROG = path.join(__dirname, 'progress.txt');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function log(m) {
  const line = new Date().toISOString().slice(11, 19) + '  ' + m + '\n';
  fs.appendFileSync(PROG, line);
}

const USERS = {
  prof: { login: 'prof@eduops.local', pass: 'demo1234' },
  parent: { login: 'parent@eduops.local', pass: 'demo1234' },
  eleve: { login: 'eleve@eduops.local', pass: 'demo1234' },
};

async function login(page, user) {
  log('  login goto ' + user.login);
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForSelector('#login', { timeout: 40000 });
  log('  login form ready');
  await page.type('#login', user.login);
  await page.type('#password', user.pass);
  await page.click('button[type="submit"]');
  await sleep(2500);
  log('  login submitted, url=' + page.url());
}

async function waitContent(page) {
  await page.waitForFunction(() => !document.querySelector('eduops-loading-state'),
    { timeout: 20000 }).catch(() => {});
  await sleep(900);
}

async function clickHref(page, href) {
  const ok = await page.evaluate((h) => {
    const a = document.querySelector('a[href="' + h + '"]');
    if (!a) return false;
    a.click(); return true;
  }, href);
  if (!ok) throw new Error('lien manquant ' + href);
  await waitContent(page);
  await sleep(700);
  log('  clicked ' + href + ' -> url=' + page.url());
}

async function snap(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: true });
  return file;
}

async function doPortal(browser, key, user, jobs) {
  log('== portal ' + key);
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 900 });
  try {
    await login(page, user);
    for (const [name, href] of jobs) {
      if (href) await clickHref(page, href);
      log('  snap ' + name);
      const f = await snap(page, name);
      log('  saved ' + f);
    }
  } catch (e) {
    log('  ERREUR ' + key + ': ' + e.message);
  }
  await page.close();
}

async function main() {
  fs.writeFileSync(PROG, 'start\n');
  const browser = await puppeteer.launch({
    executablePath: EXE, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  log('browser launched');

  await doPortal(browser, 'teacher', USERS.prof, [
    ['10-teacher-home', null],
    ['11-teacher-classes', '/teacher/classes'],
    ['12-teacher-attendance', '/teacher/attendance'],
  ]);
  await doPortal(browser, 'parent', USERS.parent, [
    ['13-parent-home', null],
  ]);
  await doPortal(browser, 'student', USERS.eleve, [
    ['14-student-home', null],
  ]);

  await browser.close();
  log('DONE');
}

main().catch((e) => { log('FATAL ' + e.message); process.exit(1); });
