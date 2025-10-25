import { Client, Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
import mcping from 'mcping-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();

const minecraftServer = new mcping.MinecraftServer(
    process.env.MINECRAFT_SERVER_HOST || 'play.pixelmoon.ir',
    parseInt(process.env.MINECRAFT_SERVER_PORT) || 25565
);

const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const fileURL = pathToFileURL(filePath).href;
    const command = await import(fileURL);
    
    if ('data' in command.default && 'execute' in command.default) {
        client.commands.set(command.default.data.name, command.default);
        console.log(`Loaded command: ${command.default.data.name}`);
    } else {
        console.log(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const fileURL = pathToFileURL(filePath).href;
    const event = await import(fileURL);
    
    if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args, client));
    } else {
        client.on(event.default.name, (...args) => event.default.execute(...args, client));
    }
    console.log(`Loaded event: ${event.default.name}`);
}

function updateServerStatus() {
    minecraftServer.ping(10000, 757, (err, res) => {
        if (err) {
            client.user.setActivity('Server Offline', { type: ActivityType.Watching });
            console.log('Minecraft server is offline');
        } else if (res) {
            const playerCount = res.players.online;
            const maxPlayers = res.players.max;
            client.user.setActivity(`${playerCount}/${maxPlayers} players online`, { 
                type: ActivityType.Watching 
            });
            console.log(`Minecraft server: ${playerCount}/${maxPlayers} players online`);
        }
    });
}

setInterval(updateServerStatus, parseInt(process.env.STATUS_UPDATE_INTERVAL) || 30000);

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Failed to login to Discord:', error);
    process.exit(1);
});

export default client;
