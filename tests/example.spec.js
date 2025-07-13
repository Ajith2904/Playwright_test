import { test, expect } from '@playwright/test';
test.describe('Selenium Playground Tests', () => {
test('Test Scenario 1: Simple Form Demo', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground');

    await page.click('text=Simple Form Demo');

    await expect(page).toHaveURL(/.*simple-form-demo/);

    const message = "Welcome to Lambda Test";

    await page.fill('#user-message', message);

    await page.click('#showInput');
    await expect(page.locator('#message')).toHaveText(message);

    const output = await page.locator('#message').textContent();
    expect(output).toContain(message);
  });
 test('Test Scenario 2: Drag & Drop Sliders', async ({ page }) => {
     await page.goto('https://www.lambdatest.com/selenium-playground');

    await page.click('text=Drag & Drop Sliders');

    const slider = page.locator("xpath=//input[@value='15']");
    const output = page.locator('//*[@id="rangeSuccess"]');

    await slider.focus();
    await slider.evaluate(e => e.scrollIntoView({ block: "center" }));

    // Drag the slider to 95
    for (let i = 0; i < 80; i++) {
      await slider.press('ArrowRight');
    }
    await expect(output).toHaveText('95');
    await expect(slider).toHaveValue('95');
    }); 
test('Test Scenario 3: Input Form Submit', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.click('text=Input Form Submit');
  await page.click('//*[@id="seleniumform"]/div[6]/button');
  // const err = await page.textContent('.error-msg');
  // if (!err.includes('Please fill in')) throw new Error('No validation error');
  
  page.on('dialog', async dialog => {
    // Assert the type of dialog (e.g., 'alert', 'confirm', 'prompt')
    expect(dialog.type()).toBe('alert');

    // Get the message of the alert
    const alertMessage = dialog.message();
    console.log(`Alert message: ${alertMessage}`);

    // Assert the message content
    expect(alertMessage).toBe('please fill out the fields');
 });
  // Fill required fields
  await page.fill('input[name=name]', 'John Doe');
  await page.fill('//*[@id="inputEmail4"]', 'john@example.com');
  await page.fill('input[name=password]', 'Pass1234!');
  await page.fill('input[name=company]', 'Acme Corp');
  await page.fill('input[name=website]', 'https://example.com');
  await page.fill('input[name=city]', 'New York');
  await page.selectOption('select[name=country]', { label: 'United States' });
  // Fill any other fields as needed...
  await page.click('//*[@id="seleniumform"]/div[6]/button');
  
  const ok = await page.textContent('.success-msg');
  if (!ok.includes('Thanks for contacting us, we will get back to you shortly.')) throw new Error('Submission failed');
});
});