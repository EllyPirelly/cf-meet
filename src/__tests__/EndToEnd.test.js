import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    // headless mode on - default
    browser = await puppeteer.launch();
    // headless mode off - to watch tests being conducted in the browser
    // const browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250,
    //   // ignores default setting that causes timeout errors
    //   ignoreDefaultArgs: ['--disable-extensions']
    // });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // ensure that event list is loaded, waits for Event to be rendered
    await page.waitForSelector('.event-container');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // selecting an element on the page; returning the first CSS selector found
    // element is present? expanded
    // element is not present? collapese
    const eventDetails = await page.$('.event-container .event-info-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    // simulate user click on toggle-details button
    await page.click('.event-container .toggle-details');
    const eventDetails = await page.$('.event-container .event-info-details');
    // eventDetails need to exist at this time
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    // simulate user click on toggle-details button
    await page.click('.event-container .toggle-details');
    const eventDetails = await page.$('.event-container .event-info-details');
    // eventDetails need to NOT exist at this time
    expect(eventDetails).toBeNull();
  });
});