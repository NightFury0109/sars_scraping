const express = require('express');
const router = express.Router();
const login = require('../library/login')
const delay = require('../helper/delay')

router.get('/test', (req, res) => res.json({ msg: 'test api is working.' }));

router.get('/', async (req, res) => {
    let logged_in_page = await login();
    await logged_in_page.waitForSelector('div.sideTax-IDNo')
    await logged_in_page.waitForNavigation();

    let tax_numbers = await logged_in_page.$$eval('.sideTax-IDNo', divs => divs.map(({ textContent }) => textContent))
    console.log("Tax Reference Number", tax_numbers[0], "Identification Number", tax_numbers[1])

    // get Tax Compliance Status Request lists
    await logged_in_page.waitForSelector('button.mat-button-icon.pull-right.ng-star-inserted')
    await delay(3000)

    let tax_status = await logged_in_page.$$('button.mat-button-icon.pull-right.ng-star-inserted')
    await tax_status[1].click();
    await logged_in_page.waitForNavigation();

    await logged_in_page.waitForSelector('iframe#main')
    // await delay(2000)

    const elementHandle = await logged_in_page.$('iframe#main');
    const frame_page = await elementHandle.contentFrame();

    await frame_page.waitForSelector('ul.tabs > li:nth-child(2) > a')
    await frame_page.click('ul.tabs > li:nth-child(2) > a')

    await frame_page.waitForSelector('#anchorFIA')
    // await delay(2000)
    await frame_page.click('#anchorFIA')

    // await frame_page.waitForSelector('#acc4 > li > div > div > ul > li > div > div > table')
    // let table_data = await frame_page.$$eval('#acc4 > li > div > div > ul > li > div > div > table tr td', td => td.map(({ innerText }) => innerText))

    // const data = await frame_page.evaluate(() => {
    //     const trs = Array.from(document.querySelectorAll('#acc4 > li > div > div > ul > li > div > div > table > tbody > tr.paginated'))
    //     console.log("trs", trs.slice(0, 10))
    //     // return tds.map(td => {
    //     //     return td.innerText.trim()
    //     // })
    // });
    // console.log("data", data)

});

module.exports = router;