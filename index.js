const puppeteer = require('puppeteer');
const site = 'http://camp-corporate-site-preview.s3-website-ap-northeast-1.amazonaws.com/news/detail/?alias=tomoshibi-close';

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  // リソース別にファイルを取得
  page.on('response',async response => {
    console.log(response.request().resourceType());
    let resourceType = response.request().resourceType();
    let isDisplayResource = true;
    switch (resourceType) {
      case "document":
        console.log('==========document=============');
        break;
      case "stylesheet":
        console.log('==========stylesheet=============');
        break;
      case "script":
        console.log('==========script=============');
        break;
      case "image":
        console.log('==========image=============');
        break;
      case "font":
        console.log('==========font=============');
        break;
      default:
        console.log('==========other=============');
        isDisplayResource = false;
        break;
    }
    if (isDisplayResource) {
      console.log(await response.text());
    }
  });
  //  await page.goto(site, {waitUntil: 'networkidle0'});
  await page.goto(site);
  await browser.close();
})();
