import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    // ensure that event list is loaded, waits for Event to be loaded
    await page.waitForSelector('.event-container');

    // selecting an element on the page; returning the first CSS selector found
    // element is present? expanded
    // element is not present? collapese
    const eventDetails = await page.$('.event-container .event-info-details');
    expect(eventDetails).toBeNull();
    browser.close();
  });

  test('User can expand an event to see its details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event-container');
    await page.click('.event-container .toggle-details');

    const eventDetails = await page.$('.event-container .event-info-details');
    expect(eventDetails).toBeDefined();
    browser.close();
  });
});