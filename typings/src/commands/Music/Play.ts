import axios from "axios";
import AloeDispatcher from "../../api/Dispatcher.js";
import AloeCommand from "../../base/AloeCommand.js";

export default class AloePlay extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "play";
    this.aliases = ["p"];
    this.cat = "music";
    this.desc = "Plays the music by adding some songs to the queue";
    this.usage = "play <query/url>";
    this.dev = false;
    this.manage = false;
    this.premium = {
      guild: false,
      user: false,
    };
    this.vc = true;
    this.samevc = true;
    this.exec = async (message: any, args: any, prefix: any) => {
      if (!args[0])
        return message.reply({
          embeds: [
            this.client.utils
              .premiumEmbed(message.guildId)
              .setDescription(`\`${prefix}play <search query or url\``)
              .setTitle(`Play Syntax`),
          ],
        });

      let query = args.join(" ");

      if (this.client.utils.checkUrl(query) === true) {
        if ((query.includes("youtube.com") || query.includes("youtu.be")) && (query.includes("https://")) || query.includes("http://")) {
          return message.reply({
            content: `${this.client.emoji.exclamation} I don't work against the Youtube's Terms Of Services`
          });
        }
        if (query.match(this.client.spotify.spotifyPattern)) {
          await this.client.spotify.requestToken();
          let node = await this.client.spotify.nodes.get("node-00");
          let result = await node.load(query);
          if (result.loadType === `PLAYLIST_LOADED`) {
            let dispatcher = this.client.api.get(message.guildId);
            if (!dispatcher) {
              if (
                !message.guild.members.me
                  .permissionsIn(message.member.voice.channel)
                  .has(["Connect", "Speak"])
              )
                return message.reply({
                  embeds: [
                    this.client.utils
                      .premiumEmbed(message.guildId)
                      .setDescription(
                        `${this.client.emoji.cross} I don't have **Connect** or **Speak** permissions in your voice channel`
                      )
                      .setTitle(`Missing Permissions`),
                  ],
                });
              let node = this.client.shoukaku.getNode();
              let player = await node.joinChannel({
                guildId: message.guildId,
                channelId: message.member.voice.channel.id,
                shardId: message.guild.shardId,
                deaf: true,
              });
              dispatcher = new AloeDispatcher(
                this.client,
                message.guild,
                message.channel,
                player
              );
              this.client.api.set(message.guild.id, dispatcher);
            }
            let spotifyTracks = [];
            for (let i = 0; i < result.tracks.length; i++) {
              let track = result.tracks[i];
              track.info.requester = message.author;
              track = this.client.utils.track(track);
              spotifyTracks.push(track);
            }
            spotifyTracks.forEach((x: any) => dispatcher.queue.push(x));
            if (!dispatcher.current) dispatcher?.play();
            return message.reply({
              embeds: [
                this.client.utils
                  .premiumEmbed(message.guildId)
                  .setDescription(
                    `${this.client.emoji.queue} Added **[${result.tracks.length}](${this.client.config.voteUrl})** Tracks from [${result.playlistInfo.name}](${this.client.config.voteUrl})`
                  ),
              ],
            });
          } else if (
            result.loadType === `LOAD_FAILED` ||
            result.loadType === `NO_MATCHES`
          ) {
            return message.reply({
              embeds: [
                this.client.utils
                  .premiumEmbed(message.guild.id)
                  .setDescription(
                    `${this.client.emoji.cross} [No results](${this.client.config.voteUrl}) found for the query provided`
                  ),
              ],
            });
          } else {
            let node = this.client.shoukaku.getNode();
            let track = result.tracks[0];
            track.info.requester = message.author;
            track = this.client.utils.track(track);
            const dispatcher = await this.client.api.handle(
              message.guild,
              message.member,
              message.channel,
              node,
              track
            );
            dispatcher?.play();
            return message.reply({
              embeds: [
                this.client.utils
                  .premiumEmbed(message.guildId)
                  .setDescription(
                    `${this.client.emoji.queue
                    } Added [${track.info.title.substring(0, 35)}](${this.client.config.voteUrl
                    }) to Queue`
                  ),
              ],
            });
          }
        }
        let node = this.client.shoukaku.getNode();
        let result = await node.rest.resolve(query);
        if (!result.tracks.length)
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guildId)
                .setDescription(
                  `${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the query`
                )
                .setTitle(`No Results`),
            ],
          });
        if (result.loadType === `PLAYLIST_LOADED`) {
          let dispatcher = this.client.api.get(message.guild.id);
          if (!dispatcher) {
            let node = this.client.shoukaku.getNode();
            const player = this.client.utils.player(node, {
              guildId: message.guildId,
              shardId: message.guild.shardId,
              channelId: message.member.voice.channel.id,
              deaf: true,
            });
            dispatcher = new AloeDispatcher(
              this.client,
              message.guild,
              message.channel,
              player
            );
            this.client.api.set(message.guildId, dispatcher);
          }
          let tracks = [];
          for (let i = 0; i < result.tracks.length; i++) {
            result.tracks[i].info.requester = message.author;
            let tr = this.client.utils.track(result.tracks[i]);
            tracks.push(tr);
          }
          tracks.forEach((x: any) => dispatcher.queue.push(x));

          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guildId)
                .setDescription(
                  `${this.client.emoji.queue} Added **[${result.tracks.length}](${this.client.config.voteUrl})** from [${result.playlistName}](${this.client.config.voteUrl})`
                ),
            ],
          });
        }
      }
      let node = this.client.shoukaku.getNode();
      let result = await node.rest.resolve(`ytsearch:${query}`);
      if (!result.tracks?.length)
        return message.reply({
          embeds: [
            this.client.utils
              .premiumEmbed(message.guildId)
              .setDescription(
                `${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the given query`
              )
              .setTitle(`No Results`),
          ],
        });

      const track = result?.tracks?.shift();
      track.info.requester = message.author;
      let tr = this.client.utils.track(track);
      const dispatcher = await this.client.api.handle(
        message.guild,
        message.member,
        message.channel,
        node,
        tr
      );
      dispatcher?.play();
      return message.reply({
        embeds: [
          this.client.utils
            .premiumEmbed(message.guildId)
            .setDescription(
              `${this.client.emoji.queue} Added [${track.info.title.substring(
                0,
                35
              )}](${this.client.config.voteUrl}) to Queue`
            ),
        ],
      });
    };
  }
}
