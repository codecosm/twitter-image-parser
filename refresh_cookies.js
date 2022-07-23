const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

async function refresh() {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
		defaultViewport: {
			width: 960,
			height: 960
		}
	});

	try {
		const page = await browser.newPage();

		await page.goto('https://twitter.com/login');
		await page.waitForTimeout(1500);
		await page.type('input', process.env.TWITTER_USERNAME);
		await page.waitForTimeout(1000);
		await page.click('[role="button"]');
		await page.waitForTimeout(1000);
		await page.click('[role="button"][style="border-color: rgba(0, 0, 0, 0);"]');
		await page.waitForTimeout(1000);
		await page.click('[data-testid="loginButton"]');
		await page.waitForTimeout(1000);
		await page.type('input', process.env.TWITTER_USERNAME);
		await page.waitForTimeout(1000);
		await page.click('[role="button"][style="border-color: rgba(0, 0, 0, 0);"]');
		await page.waitForTimeout(1000);
		await page.type('.r-30o5oe', process.env.TWITTER_PASSWORD);
		await page.waitForTimeout(1000);
		await page.click('[role="button"][style="border-color: rgba(0, 0, 0, 0);"][data-testid="LoginForm_Login_Button"]');
		await page.waitForTimeout(1000);

		const cookies = await page.cookies();
		const cookieJson = JSON.stringify(cookies);

		fs.writeFileSync('cookies.json', cookieJson);
		await page.waitForTimeout(3000);
		console.log('Cookies saved!');
		browser.close();
	} catch {
		browser.close();
		refresh();
	}
}

refresh();
