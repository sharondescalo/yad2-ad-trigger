const puppeteer = require('puppeteer');
const CREDS = require('./creds');
// dom element selectors
const USERNAME_SELECTOR = '#userName';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#submitLogonForm';
const GreenButton = '#bounceRatingOrderBtn';
//const GreenButton = '[class="fieldCnt editOrderBtn viewCommand viewSize1 viewCommandGreenBtn"]';
const CarId = '[class="item item-color-1"]';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://my.yad2.co.il/login.php');
  await page.waitFor(2*1000);
  
  await page.click(USERNAME_SELECTOR),
  await page.keyboard.type(CREDS.username),
  await page.click(PASSWORD_SELECTOR),
  await page.keyboard.type(CREDS.password),

  // click and wait for navigation
   await Promise.all([
    await page.click(BUTTON_SELECTOR),
    await page.waitFor(2*1000)
    //await page.waitForNavigation({ waitUntil: 'networkidle0' }),

 ]);

await page.goto('https://my.yad2.co.il/newOrder/index.php?action=personalAreaFeed&CatID=1&SubCatID=1');
await page.waitFor(2*1000);

await page.focus(CarId);
await page.click(CarId);
//await page.waitForNavigation({ waitUntil: 'load' })

await page.waitFor(3*1000);
//await page.waitForNavigation({ waitUntil: 'load' })

var frames = await page.frames();
var myframe = frames.find(
  f =>
      f.url().indexOf("my.yad2.co.il/newOrder/index.php?action=personalAreaViewDetails") > 0);
const bump_btn = await myframe.$(GreenButton);
await bump_btn.click();

await page.waitFor(3*1000);

await browser.close();
})().catch(function(
){});
