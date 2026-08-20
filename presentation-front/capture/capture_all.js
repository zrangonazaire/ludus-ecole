const http = require('http');
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// ---------------- Serveur statique (SPA fallback) ----------------
const ROOT = 'c:\\PROJET\\LUDUS-ECOLE\\frontend\\dist\\eduops\\browser';
const MIME = { '.html':'text/html; charset=utf-8', '.js':'application/javascript',
  '.css':'text/css', '.json':'application/json', '.png':'image/png',
  '.ico':'image/x-icon', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json',
  '.woff2':'font/woff2', '.txt':'text/plain' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let fp = path.join(ROOT, p);
  if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) fp = path.join(ROOT, 'index.html');
  const ext = path.extname(fp).toLowerCase();
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(500); res.end('ERR'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const PORT = 4200;
const OUT = path.join(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EXE = fs.existsSync(EDGE) ? EDGE : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:' + PORT;

const ADMIN = { login: 'admin@eduops.local', pass: 'demo1234' };
const TEACHER = { login: 'prof@eduops.local', pass: 'demo1234' };
const PARENT = { login: 'parent@eduops.local', pass: 'demo1234' };
const STUDENT = { login: 'eleve@eduops.local', pass: 'demo1234' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const report = (name, ok, msg) => { results.push(`${name} ${ok?'OK':'ERREUR'} -> ${msg}`); };

async function waitLoaded(page, timeout = 30000) {
  await page.waitForFunction(() => !document.querySelector('eduops-loading-state'),
    { timeout }).catch(() => {});
  await sleep(900);
}
async function snap(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: true });
  return file;
}
async function login(page, user) {
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#login', { timeout: 60000 }).catch(() => {});
  await page.type('#login', user.login);
  await page.type('#password', user.pass);
  await page.click('button[type="submit"]');
  await waitLoaded(page, 30000);
  await sleep(1500);
}
async function clickHref(page, href) {
  const ok = await page.evaluate((h) => {
    const a = document.querySelector('a[href="' + h + '"]');
    if (!a) return false; a.click(); return true;
  }, href);
  if (!ok) throw new Error('lien manquant ' + href);
  await waitLoaded(page, 30000); await sleep(900); return page.url();
}
async function clickFirstRow(page) {
  const ok = await page.evaluate(() => {
    const tr = document.querySelector('table tbody tr');
    if (!tr) return false;
    tr.click(); return true;
  });
  if (!ok) throw new Error('ligne de table manquante');
  await waitLoaded(page, 30000);
  await sleep(900);
  return page.url();
}

async function runAdmin(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  try {
    await login(page, ADMIN);
    report('02-dashboard', true, await snap(page, '02-dashboard'));
    await clickHref(page, '/students');
    report('03-students', true, await snap(page, '03-students'));
    await clickFirstRow(page);
    report('04-student-detail', true, await snap(page, '04-student-detail'));
    await clickHref(page, '/enrollments');
    report('05-enrollments', true, await snap(page, '05-enrollments'));
    await clickHref(page, '/enrollments/new');
    report('06-enrollment-wizard', true, await snap(page, '06-enrollment-wizard'));
    await clickHref(page, '/classes');
    report('07-classes', true, await snap(page, '07-classes'));
    await clickHref(page, '/teachers');
    report('08-teachers', true, await snap(page, '08-teachers'));
    await clickHref(page, '/payments');
    report('09-payments', true, await snap(page, '09-payments'));
  } catch (e) {
    report('admin-session', false, e.message);
  }
  await page.close();
}

async function runTeacher(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 900 });
  try {
    await login(page, TEACHER);
    report('10-teacher-home', true, await snap(page, '10-teacher-home'));
    await clickHref(page, '/teacher/classes');
    report('11-teacher-classes', true, await snap(page, '11-teacher-classes'));
    await clickHref(page, '/teacher/attendance');
    report('12-teacher-attendance', true, await snap(page, '12-teacher-attendance'));
  } catch (e) {
    report('teacher-session', false, e.message);
  }
  await page.close();
}

async function runParent(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 900 });
  try {
    await login(page, PARENT);
    report('13-parent-home', true, await snap(page, '13-parent-home'));
  } catch (e) {
    report('parent-session', false, e.message);
  }
  await page.close();
}

async function runStudent(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 900 });
  try {
    await login(page, STUDENT);
    report('14-student-home', true, await snap(page, '14-student-home'));
  } catch (e) {
    report('student-session', false, e.message);
  }
  await page.close();
}

async function main() {
  // Démarrer le serveur DANS ce processus
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, resolve);
  });
  console.log('server up on :' + PORT);

  const browser = await puppeteer.launch({
    executablePath: EXE, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const loginPage = await browser.newPage();
  await loginPage.setViewport({ width: 1440, height: 900 });
  try {
    await loginPage.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await loginPage.waitForSelector('#login', { timeout: 60000 }).catch(() => {});
    await sleep(1000);
    report('01-login', true, await snap(loginPage, '01-login'));
  } catch (e) {
    report('01-login', false, e.message);
  }
  await loginPage.close();

  await runAdmin(browser);
  await runTeacher(browser);
  await runParent(browser);
  await runStudent(browser);

  await browser.close();
  server.close();
  fs.writeFileSync(path.join(__dirname, 'capture-results.txt'), results.join('\n'));
  console.log('DONE', results.length, 'results');
}

main().catch((e) => {
  console.error('FATAL', e.message);
  fs.writeFileSync(path.join(__dirname, 'capture-results.txt'), 'FATAL ' + e.message);
  process.exit(1);
});

