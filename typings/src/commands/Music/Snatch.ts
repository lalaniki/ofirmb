import { Presence, PresenceData } from "discord.js";
import AloeCommand from "../../base/AloeCommand.js";
import AloeDispatcher from "../../api/Dispatcher.js";
import AloePlayer from "../../base/AloePlayer.js";

export default class AloeSnatch extends AloeCommand {
    constructor(client: any) {
        super(client);
        this.name = 'snatch';
        this.aliases = [];
        this.cat = 'music';
        this.dev = false;
        this.desc = "Snatches the music from a user and plays for the requester";
        this.manage = false;
        this.usage = `snatch <user>`;
        this.vc = true;
        this.samevc = true;
        this.exec = async (message: any, args: any, prefix: any) => {
            let member;
            if (message.mentions.members.filter((x: any) => x !== message.guild.members.me).first()) member = message.mentions.members.filter((x: any) => x !== message.guild.members.me).first();
            else if (args[0]) member = await message.guild.members.fetch(args[0]);
            if (!member) {
                return message.reply({
                    content: `${this.client.emoji.cross} Please mention a Valid Member!`
                });
            }

            if (!member.presence?.activities?.length) {
                return message.reply({
                    content: `${this.client.emoji.cross} There is No Activity ${member} is currently Doing!`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }

            let activity: any[] = [];
            member.presence?.activities.filter((x: any) => x.name.toLowerCase() === 'spotify' && x.type === 2).forEach((y: any) => {
                activity.push(y);
            });
            if (!activity.length) {
                return message.reply({
                    content: `${this.client.emoji.exclamation} Mentioned User ${member} is not Listening to Spotify Currently!`,
                    allowedMentions: { repliedUser: false }
                });
            }

            let song = activity[0];
            let query = `https://open.spotify.com/track/${song.syncId}`;
            let msg = await message.channel.send({
                embeds: [
                    this.client.utils.premiumEmbed(message.guild.id)
                        .setThumbnail(song.assets.largeImageURL({ forceStatic: false }))
                        .setTitle(`Activity Details`)
                        .setDescription(`>>> **Song Name:** \`${song.details.substring(0, 35)}\`\n**Author:** \`${song.state.split(";")[0]}}\``)
                ],
                components: [
                    this.client.utils.actionRow([
                        this.client.utils.button(
                            "custom_id",
                            "Confirm",
                            3,
                            "yes",
                            null,
                            this.client.emoji.tick
                        ),
                        this.client.utils.button(
                            "custom_id",
                            "Decline",
                            4,
                            "no",
                            null,
                            this.client.emoji.cross
                        )
                    ]
                    )
                ]
            });

            let collector: any = await msg.createMessageComponentCollector({
                filter: (b: any) => {
                    if (b.user.id === message.author.id) return true;
                    else return b.reply({
                        content: `${this.client.emoji.cross} Not Your Session!`,
                        ephemeral: true
                    })
                },
                time: 100000 * 7,
                idle: (100000 * 7) / 2
            });

            collector.on("collect", async (interaction: any) => {
                if (interaction.isButton()) {
                    if (interaction.customId === 'yes') {
                        if (!query.match(this.client.spotify.spotifyPattern)) {
                            return await interaction.update({
                                content: `${this.client.emoji.cross} I couldn't Provide you the Playback using this Spotify Session :(`,
                                embeds: [],
                                components: []
                            });
                        }
                        await this.client.spotify.requestToken();
                        let node = this.client.spotify.nodes.get("node-00");
                        let res = await node.load(query);
                        if (res.loadType === 'PLAYLIST_LOADED') {
                            return await interaction.update({
                                content: `${this.client.emoji.cross} I couldn't Provide you the Playback using this Spotify Session :(`,
                                embeds: [],
                                components: []
                            });
                        }
                        else if (res.loadType === 'LOAD_FAILED' || res.loadType === 'NO_RESULTS') {
                            return await interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guild.id)
                                        .setDescription(
                                            `${this.client.emoji.cross} [No results](${this.client.config.voteUrl}) found for the query provided`
                                        ),
                                ],
                                content: ``,
                                components: []
                            });
                        }
                        else {
                            let node = this.client.shoukaku.getNode();
                            let track = res.tracks[0];
                            track.info.requester = message.author;
                            track = this.client.utils.track(track);
                            const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, track);
                            dispatcher?.play();

                            return await interaction.update({
                                embeds: [
                                    this.client.utils.premiumEmbed(message.guild.id)
                                        .setDescription(`${this.client.emoji.queue} Added [${track.info.title.substring(0, 35)}](${this.client.config.server}) To Queue`)
                                ],
                                components: [],
                                content: ``
                            });
                        }
                    }
                    else if (interaction.customId === 'no') {
                        return interaction.update({
                            embeds: [
                                this.client.utils.premiumEmbed(message.guild.id)
                                    .setTitle(`Cancelled!`)
                            ],
                            components: [],
                            content: ``
                        });
                    }
                }
            });

            collector.on("end", async () => {
                if (message.channel.messages.cache.get(msg.id)) {
                    if (collector.collected) return;
                    else {
                        return await msg.edit({
                            components: [
                                this.client.utils.actionRow(
                                    this.client.utils.button(
                                        "custom_id",
                                        "Confirm",
                                        3,
                                        "yes",
                                        null,
                                        this.client.emoji.tick
                                    ).setDisabled(true),
                                    this.client.utils.button(
                                        "custom_id",
                                        "Decline",
                                        4,
                                        "no",
                                        null,
                                        this.client.emoji.cross
                                    ).setDisabled(true)
                                )
                            ]
                        })
                    }
                }
                else return;
            });
        }
    }
}