## Instructions

1. Create a file simply called **.env** and fill it with the required environment variables by copying and pasting the following code snippet. Then fill the needed values between the quotes.
    ```<!-- prettier-ignore -->
    DISCORD_TOKEN=""
    DISCORD_CHANNEL=""
    TWITTER_USERNAME=""
    TWITTER_PASSWORD=""
    TWITTER_PROFILE=""
    ```
    - _DISCORD_TOKEN:_ The secret token of your discord bot.
    - _DISCORD_CHANNEL:_ The ID of the discord channel you want the bot to send the images in.
    - _TWITTER_USERNAME:_ The username of the Twitter account you wish to automate.
    - _TWITTER_PASSWORD:_ The password of the Twitter account you wish to automate.
    - _TWITTER_PROFILE:_ The URL of the Twitter profile you want to track.
2. Install the required modules by running `npm i` in the console.
3. Save the cookies for the Twitter account by running `node refresh_cookies.js` in the console.
4. Start the script by running `node .` or `node index.js` in the console.
5. Enjoy.
