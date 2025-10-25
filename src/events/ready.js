import { Events, ActivityType } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bot is ready! Logged in as ${client.user.tag}`);
        console.log(`Serving ${client.guilds.cache.size} guilds`);
        console.log(`Serving ${client.users.cache.size} users`);
        
        client.user.setActivity('Starting up...', { type: ActivityType.Playing });
        
        setTimeout(() => {
            client.user.setActivity('Pixel Moon Server', { type: ActivityType.Watching });
        }, 2000);
    },
};
