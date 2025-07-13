// lambdatest-utils.js
const { chromium, firefox } = require('playwright');

function getWS(capabilities) {
  const caps = {
    browserName: capabilities.browserName,
    browserVersion: 'latest',
    'LT:Options': {
      platform: capabilities.platform,
      build: 'Playwright 101 Assignment',
      name: capabilities.name,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      video: true,
      console: true,
      network: true,
    }
  };
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(caps))}`;
}

async function launchBrowser(browserType, capabilities) {
  const ws = getWS(capabilities);
  const browser = await browserType.connect({ wsEndpoint: ws });
  const page = await browser.newPage();
  return { browser, page };
}

module.exports = { launchBrowser, chromium, firefox };
