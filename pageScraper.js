const scraperObject = {
  url: 'https://secure.sarsefiling.co.za/app/login',
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.type("#username", "Petra6890631");
    await page.click("#btnLogin");
    await page.waitForNavigation();
    await page.type("#password", "PetRa689*");
    await page.click("#btnLogin");
    await page.waitForNavigation();
    // await page.waitForSelector('div.sideTax-IDNo')
    const tax_reference_num = await page.$("div.mat-drawer-inner-container > div.p-3 > div.p-2:nth-child(1) > div.sideTax-IDNo", e => e.innerHTML);
    console.log(tax_reference_num);
  }
}

module.exports = scraperObject;