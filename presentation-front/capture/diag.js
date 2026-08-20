const puppeteer = require('puppeteer-core');
const fs = require('fs');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EXE = fs.existsSync(EDGE) ? EDGE : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4200';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({ executablePath: EXE, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#login', { timeout: 60000 }).catch(()=>{});
  await page.type('#login', 'admin@eduops.local');
  await page.type('#password', 'demo1234');
  await Promise.all([ page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(()=>{}),
      page.click('button[type="submit"]') ]);
  await sleep(2000);
  console.log('URL after login:', page.url());

  for (const route of ['/dashboard', '/students', '/classes', '/payments', '/login']) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(1500);
    const info = await page.evaluate(() => {
      const body = (document.body.innerText || '').replace(/\s+/g, ' ').trim();
      return {
        url: location.pathname,
        textLen: body.length,
        hasLoading: !!document.querySelector('eduops-loading-state'),
        hasError: !!document.querySelector('eduops-error-state'),
        text: body.slice(0, 220),
      };
    });
    console.log('=== ' + route + ' -> ' + info.url + ' textLen=' + info.textLen +
      ' loading=' + info.hasLoading + ' error=' + info.hasError);
    console.log('   ' + info.text);
  }
  await browser.close();
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
