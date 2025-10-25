import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import mcping from 'mcping-js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get information about the Pixel Moon Minecraft server'),
    cooldown: 10,
    async execute(interaction, client) {
        await interaction.deferReply();

        const server = new mcping.MinecraftServer(
            process.env.MINECRAFT_SERVER_HOST || 'play.pixelmoon.ir',
            parseInt(process.env.MINECRAFT_SERVER_PORT) || 25565
        );

        server.ping(10000, 757, (err, res) => {
            const embed = new EmbedBuilder()
                .setColor(err ? '#ff6b6b' : '#00ff88')
                .setTitle('Pixel Moon Server Info')
                .setTimestamp()
                .setFooter({ 
                    text: `Requested by ${interaction.user.tag}`, 
                    iconURL: interaction.user.displayAvatarURL() 
                });

            if (err) {
                embed.addFields(
                    { name: 'Status', value: 'Offline', inline: true },
                    { name: 'Players', value: 'N/A', inline: true },
                    { name: 'Version', value: 'N/A', inline: true }
                );
            } else {
                const playerCount = res.players.online;
                const maxPlayers = res.players.max;
                const version = res.version.name;
                const description = res.description?.text || 'No description available';

                embed.addFields(
                    { name: 'Status', value: 'Online', inline: true },
                    { name: 'Players', value: `${playerCount}/${maxPlayers}`, inline: true },
                    { name: 'Version', value: version, inline: true },
                    { name: 'Description', value: description, inline: false }
                );

                if (res.players.sample && res.players.sample.length > 0) {
                    const samplePlayers = res.players.sample
                        .slice(0, 5)
                        .map(player => player.name)
                        .join(', ');
                    embed.addFields({ 
                        name: 'Online Players (Sample)', 
                        value: samplePlayers || 'No players visible', 
                        inline: false 
                    });
                }
            }

            interaction.editReply({ embeds: [embed] });
        });
    },
};
