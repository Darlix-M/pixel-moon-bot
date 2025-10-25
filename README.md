# Pixel Moon Bot

A simple Discord bot for my Pixel Moon Minecraft server. It shows server status and has some basic commands.

## What it does

- `/ping` - shows how fast the bot responds
- `/serverinfo` - shows if the minecraft server is online and how many players
- `/help` - shows all commands
- The bot status shows how many players are online

## How to set it up

You need:
- Node.js (get it from nodejs.org)
- A Discord bot (make one at discord.com/developers/applications)

Steps:

1. Download this code
   ```bash
   git clone https://github.com/Darlix/pixel-moon-bot.git
   cd pixel-moon-bot
   ```

2. Install stuff
   ```bash
   npm install
   ```

3. Make a .env file
   ```bash
   copy .env.example .env
   ```
   
   Then edit the .env file and put your bot token and stuff:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   MINECRAFT_SERVER_HOST=play.pixelmoon.ir
   MINECRAFT_SERVER_PORT=25565
   STATUS_UPDATE_INTERVAL=30000
   ```

4. Register the commands
   ```bash
   npm run deploy
   ```

5. Start the bot
   ```bash
   npm start
   ```

## Files in this project

```
pixel-moon-bot/
├── src/
│   ├── commands/          # all the slash commands
│   │   ├── ping.js
│   │   ├── serverinfo.js
│   │   └── help.js
│   ├── events/            # bot events like when it starts
│   │   ├── ready.js
│   │   ├── interactionCreate.js
│   │   └── error.js
│   ├── index.js           # main bot file
│   └── deploy-commands.js  # registers commands to discord
├── .env.example          # copy this to .env and fill it out
├── package.json           # project info
└── README.md             # this file
```

## Commands

- `/ping` - shows bot speed (5 second cooldown)
- `/serverinfo` - shows minecraft server info (10 second cooldown)  
- `/help` - shows this help (5 second cooldown)

## Settings

You need to set these in your .env file:

- `DISCORD_TOKEN` - your bot token (required)
- `CLIENT_ID` - your bot's application id (required)
- `GUILD_ID` - your discord server id (optional, makes commands load faster)
- `MINECRAFT_SERVER_HOST` - minecraft server address (default: play.pixelmoon.ir)
- `MINECRAFT_SERVER_PORT` - minecraft server port (default: 25565)
- `STATUS_UPDATE_INTERVAL` - how often to check server (default: 30000ms)

## Bot permissions needed

- Send Messages
- Use Slash Commands  
- Embed Links
- Read Message History

## If something breaks

1. Bot not responding to commands?
   - Did you run `npm run deploy`?
   - Check bot permissions

2. Server info not working?
   - Is the minecraft server online?
   - Check the server address in .env

3. Environment variables not working?
   - Make sure .env file is in the right place
   - Check all the required variables are set

## Making new commands

1. Make a new file in `src/commands/`
2. Copy the structure from another command file
3. Run `npm run deploy` to register it

## License

MIT License - do whatever you want with it