import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency and response time'),
    cooldown: 5,
    async execute(interaction, client) {
        const sent = await interaction.reply({ 
            content: 'Pinging...', 
            fetchReply: true 
        });

        const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;
        const websocketHeartbeat = client.ws.ping;

        const pingEmbed = new EmbedBuilder()
            .setColor('#00ff88')
            .setTitle('Pong!')
            .addFields(
                { name: 'Roundtrip Latency', value: `${roundtripLatency}ms`, inline: true },
                { name: 'WebSocket Heartbeat', value: `${websocketHeartbeat}ms`, inline: true },
                { name: 'Uptime', value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL() 
            });

        await interaction.editReply({ 
            content: null, 
            embeds: [pingEmbed] 
        });
    },
};
