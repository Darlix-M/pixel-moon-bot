import { Events } from 'discord.js';

export default {
    name: Events.Error,
    async execute(error, client) {
        console.error('Discord client error:', error);
    },
};
