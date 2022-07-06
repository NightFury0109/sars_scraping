require('dotenv').config();

const browserObject = require('../utils/browser');

const login = async () => {
    try {
        console.log("starting scraping......")
        let browser = await browserObject.startBrowser();
        let page = await browser.pages();
        page = page[0]
        await page.setDefaultNavigationTimeout(0);

        await page.goto("https://secure.sarsefiling.co.za/app/login");
        await page.waitForSelector('#username')
        await page.type("#username", process.env.LOGIN_NAME);
        await page.click("#btnLogin");
        await page.waitForNavigation();

        await page.waitForSelector('#password')
        await page.type("#password", process.env.LOGIN_PWD);
        await page.click("#btnLogin");
        await page.waitForNavigation();

        return page;
    } catch (err) {
        console.log('scraping is stopped by' + err)
    }
}

module.exports = login;