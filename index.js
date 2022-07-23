const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const Intents = Discord.Intents;

const client = new Discord.Client({
	intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

async function update() {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
		defaultViewport: {
			width: 960,
			height: 960
		}
	});

	try {
		if (!fs.existsSync('cookies.json')) {
			console.log('cookies.json file not found. Please run `refresh_cookies.js` to set cookies first.');
			return;
		} else if (!fs.existsSync('.env')) {
			console.log(
				'.env file not found. Please create a .env file with the required environment variables. read the readme for more information.'
			);
			return;
		}

		const page = await browser.newPage();

		const cookies = fs.readFileSync('cookies.json', 'utf8');
		const deserializedCookies = JSON.parse(cookies);
		await page.setCookie(...deserializedCookies);

		await page.goto(process.env.TWITTER_PROFILE);

		await page.waitForTimeout(3000);

		let tweetArrayPre = await page.$$eval('div[data-testid="tweetPhoto"] > .css-9pa8cd', (tweets) => {
			return tweets.map((tweet) => tweet.src.toString().replace(/small|240x240|360x360/g, 'large'));
		});

		page.waitForTimeout(1000);

		let imageArray = [...new Set(tweetArrayPre)];

		if (fs.existsSync('./tweets.txt')) {
			fs.readFile('./tweets.txt', 'utf8', async (err, data) => {
				imageArray.forEach((image) => {
					if (!data.includes(image)) {
						client.channels.cache.get(process.env.DISCORD_CHANNEL).send(image);
						fs.appendFile('./tweets.txt', `${image}\n`, (err) => {});
						console.log(`Updated with ${image}!`);
					}
				});
			});
		} else {
			fs.writeFile('./tweets.txt', '', (err) => {
				setTimeout(() => {
					imageArray.forEach((image) => {
						client.channels.cache.get(process.env.DISCORD_CHANNEL).send(image);
						fs.appendFile('./tweets.txt', `${image}\n`, (err) => {});
						console.log(`Updated with ${image}!`);
					});
				}, 1000);
			});
		}

		setTimeout(() => {
			browser.close();
			update();
		}, 3000);
	} catch {
		browser.close();
		update();
	}
}

client.on('ready', () => {
	console.log('Ready!');
	update();
});

client.login(process.env.DISCORD_TOKEN);
