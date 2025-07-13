// parallel-run.js
const { chromium, firefox } = require('playwright');
const { runScenario: s1 } = require('./scenario1');
const { runScenario: s2 } = require('./scenario2');
const { runScenario: s3 } = require('./scenario3');

const tests = [
  { fn: s1, browser: chromium, cap: { browserName: 'pw-chromium', platform: 'Windows 10', name: 'Simple Form Demo - Chrome' } },
  { fn: s1, browser: firefox,    cap: { browserName: 'pw-firefox',  platform: 'macOS Catalina', name: 'Simple Form Demo - Firefox' } },
  { fn: s2, browser: chromium, cap: { browserName: 'pw-chromium', platform: 'Windows 10', name: 'Slider Demo - Chrome' } },
  { fn: s2, browser: firefox,    cap: { browserName: 'pw-firefox',  platform: 'macOS Catalina', name: 'Slider Demo - Firefox' } },
  { fn: s3, browser: chromium, cap: { browserName: 'pw-chromium', platform: 'Windows 10', name: 'Form Submit - Chrome' } },
  { fn: s3, browser: firefox,    cap: { browserName: 'pw-firefox',  platform: 'macOS Catalina', name: 'Form Submit - Firefox' } }
];

(async () => {
  await Promise.all(tests.map(t => t.fn({ browserType: t.browser, ...t.cap }, t.browser)));
  console.log('All tests passed!');
})().catch(e => {
  console.error('Test failure:', e);
  process.exit(1);
});
