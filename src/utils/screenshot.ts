import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

const screenshot = async (html: string): Promise<string | void | Buffer> => {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 628 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const file = await page.screenshot({ type: 'png' });
  await browser.close();
  return file;
};

export default screenshot;
