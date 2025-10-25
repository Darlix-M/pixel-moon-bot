import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display information about available commands'),
    cooldown: 5,
    async execute(interaction, client) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('Pixel Moon Bot - Help')
            .setDescription('Here are all the available commands:')
            .addFields(
                { 
                    name: '`/ping`', 
                    value: 'Check the bot\'s latency and response time', 
                    inline: false 
                },
                { 
                    name: '`/serverinfo`', 
                    value: 'Get information about the Pixel Moon Minecraft server', 
                    inline: false 
                },
                { 
                    name: '`/help`', 
                    value: 'Display this help message', 
                    inline: false 
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL() 
            })
            .setThumbnail(client.user.displayAvatarURL());

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
