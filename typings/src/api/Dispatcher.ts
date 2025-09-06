import { Collection } from "discord.js";
import { get247Set, getAutoplay } from "./db/settings.js";
import { times } from "lodash";
import { getDjChannel } from "./db/dj.js";
import reconnectData from "../database/reconnectData.js";
import db from "../database/setup.js";
export default class AloeDispatcher {
  public client: any;
  public guild: any;
  public channel: any;
  public player: any;
  public repeat: string;
  public current: any;
  public stopped: boolean;
  public punit: boolean;
  public previous: any;
  public queue: any[];
  // public filters: object;
  public data: Collection<string, any>;
  constructor(client: any, guild: any, channel: any, player: any) {
    this.client = client;
    this.guild = guild;
    this.channel = channel;
    this.player = player;
    this.repeat = "off";
    this.queue = [];
    this.data = new Collection();
    this.current = null;
    this.previous = null;
    this.stopped = false;
    this.punit = false;


    this.player.on("start", async () => {
      if (this.repeat === "one") {
        if (this.punit) return;
        else this.punit = true;
      }
      if (this.repeat === "all" || this.repeat === "off") {
        this.punit = false;
      }
      let set = await db.findOne({ guildId: this.guild.id });
      if (set) {
        let ch = this.guild.channels.cache.get(set.channelId);
        if(!ch) ch = await this.guild.channels.fetch(set.channelId).catch(() => {});
        if (ch) {
          this.updateQueue(this.guild, this.queue);
          let msg = ch.messages.cache.get(set.messageId);
          if(!msg) msg = await ch.messages.fetch(set.messageId).catch(( ) => { });
          if(msg)
            msg.edit({
              embeds: [
                this.client.utils
                  .embed()
                  .setTitle(
                    `${this.client.emoji.setup.nowPlaying
                    } ${this.current.info.title.substring(0, 40)}`
                  )
                  .setURL(`${this.client.config.voteUrl}`)
                  .addFields([
                    {
                      name: `${this.client.emoji.setup.requester} Requester`,
                      value: `${this.current.info.requester.tag}`,
                      inline: true,
                    },
                    {
                      name: `${this.client.emoji.setup.duration} Duration`,
                      value: `${this.client.utils.humanize(
                        this.current.info.length
                      )}`,
                      inline: true,
                    },
                    {
                      name: `${this.client.emoji.setup.author} Song Author`,
                      value: `[${this.current.info.author}](${this.client.config.voteUrl})`,
                      inline: true,
                    },
                  ])
                  .setImage(`${this.client.config.setupBgLink}`)
                  .setFooter({
                    text: `🔥 Thanks for choosing ${this.client.user.username}`,
                    iconURL: this.client.user.displayAvatarURL(),
                  })
                  .setAuthor({
                    name: `| Now Playing`,
                    iconURL: this.client.user.displayAvatarURL(),
                  }),
              ],
            });
        }
      }
      let setting = this.client.utils.getPlayerMode(this.guild.id);
      if (setting === "avon-old") {
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setDescription(
            `[${this.current.info.title}](${this.client.config.voteUrl}) By [${this.current.info.author
            }](${this.client.config.voteUrl})  [${this.client.utils.humanize(
              this.current.info.length
            )}]`
          )
          .setThumbnail(
            this.current.info.requester.displayAvatarURL({ dynamic: true })
          )
          .setAuthor({
            name: `| Now Playing`,
            iconURL: this.current.info.requester.displayAvatarURL({
              dynamic: true,
            }),
          });
        let b1 = this.client.utils.button(`custom_id`, `Stop`, 4, `avon_stop`);
        let b2 = this.client.utils.button(
          `custom_id`,
          `Pause`,
          3,
          `avon_pause`
        );
        let b3 = this.client.utils.button(`custom_id`, `Loop`, 1, `avon_loop`);
        let b4 = this.client.utils.button(
          `custom_id`,
          `Previous`,
          2,
          `avon_previous`
        );
        let b5 = this.client.utils.button(`custom_id`, `Skip`, 2, `avon_skip`);
        let row = this.client.utils.actionRow([b1, b2, b3, b4, b5]);
        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row],
            })
            .then((x: any) => {
              this.data.set("Aloe", x);
            });
        return;
      }
      if (setting === `avon-classic`) {
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setThumbnail(
            `https://img.youtube.com/vi/${this.current.info.identifier}/maxresdefault.jpg`
          )
          .setTitle(
            `${this.client.emoji.avonNew.nowPlaying
            } ${this.current.info.title.substring(0, 30)}`
          )
          .setURL(`${this.client.config.voteUrl}`)
          .setDescription(
            `${this.client.emoji.avonNew.requester} **Requester :** ${this.current.info.requester.tag
            }\n${this.client.emoji.avonNew.duration
            } **Duration :** ${this.client.utils.humanize(
              this.current.info.length
            )}`
          );
        let b1 = this.client.utils.button(`custom_id`, `Stop`, 4, `avon_stop`);
        let b2 = this.client.utils.button(
          `custom_id`,
          `Pause`,
          3,
          `avon_pause`
        );
        let b3 = this.client.utils.button(`custom_id`, `Loop`, 1, `avon_loop`);
        let b4 = this.client.utils.button(
          `custom_id`,
          `Previous`,
          2,
          `avon_previous`
        );
        let b5 = this.client.utils.button(`custom_id`, `Skip`, 2, `avon_skip`);
        let row = this.client.utils.actionRow([b1, b2, b3, b4, b5]);
        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row],
            })
            .then((x: any) => this.data.set("Aloe", x));
        return;
      }
      if (setting === "avon-no") {
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setAuthor({
            name: `Now Playing`,
            iconURL: this.client.user.displayAvatarURL(),
          })
          .setThumbnail(
            this.current.info.requester.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `${this.client.emoji.noButtons.emote
            } [${this.current.info.title.substring(0, 35)}](${this.client.config.voteUrl
            })`
          )
          .addFields([
            {
              name: `${this.client.emoji.noButtons.requester} Requester`,
              value: `${this.current.info.requester.tag}`,
              inline: true,
            },
            {
              name: `${this.client.emoji.noButtons.duration} Duration`,
              value: `${this.client.utils.humanize(this.current.info.length)}`,
              inline: true,
            },
          ]);

        let opt1 = this.client.utils.menuOption(
          `Reset Filters`,
          this.client.emoji.noButtons.filters,
          `Resets all the filters of the player`,
          `avon_filter_reset`
        );
        let opt2 = this.client.utils.menuOption(
          `8D`,
          this.client.emoji.noButtons.filters,
          `Sets Up 8d filter to the player`,
          `avon_filter_8d`
        );
        let opt3 = this.client.utils.menuOption(
          `BassBoost`,
          this.client.emoji.noButtons.filters,
          `Sets bassboost filter to the player`,
          `avon_filter_bassboost`
        );
        let opt4 = this.client.utils.menuOption(
          `NightCore`,
          this.client.emoji.noButtons.filters,
          `Sets NightCore filter to the player`,
          `avon_filter_nightcore`
        );
        let opt5 = this.client.utils.menuOption(
          `Vaporwave`,
          this.client.emoji.noButtons.filters,
          `Sets Vaporwave filter to the player`,
          `avon_filter_vibrato`
        );
        let options = [opt1, opt2, opt3, opt4, opt5];
        let menu = this.client.utils.menu(
          `Choose filters`,
          `no-buttons`,
          options
        );

        let row = this.client.utils.actionRow([menu]);

        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row],
            })
            .then((x: any) => this.data.set("Aloe", x));
        return;
      }

      if (setting === `avon-special`) {
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setTitle(`${this.current.info.title.substring(0, 35)}`)
          .setURL(`${this.client.config.voteUrl}`)
          .addFields([
            {
              name: `${this.client.emoji.special.requester} Requester`,
              value: `${this.current.info.requester.tag}`,
              inline: true,
            },
            {
              name: `${this.client.emoji.special.duration} Duration`,
              value: `${this.client.utils.humanize(this.current.info.length)}`,
            },
          ])
          .setThumbnail(
            `https://img.youtube.com/vi/${this.current.info.identifier}/maxresdefault.jpg`
          );

        let b1 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_previous`,
          null,
          this.client.emoji.special.previous
        );
        let b2 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_shuffle`,
          null,
          this.client.emoji.special.shuffle
        );
        let b3 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_pause`,
          null,
          this.client.emoji.special.pause
        );
        let b4 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_loop`,
          null,
          this.client.emoji.special.loop
        );
        let b5 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_skip`,
          null,
          this.client.emoji.special.skip
        );
        let b6 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_volLow`,
          null,
          this.client.emoji.special.volLow
        );
        let b7 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_backward`,
          null,
          this.client.emoji.special.backward
        );
        let b8 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_stop`,
          null,
          this.client.emoji.special.stop
        );
        let b9 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_forward`,
          null,
          this.client.emoji.special.forward
        );
        let b10 = this.client.utils.button(
          `custom_id`,
          null,
          4,
          `avon_volHigh`,
          null,
          this.client.emoji.special.volHigh
        );
        let row1 = this.client.utils.actionRow([b1, b2, b3, b4, b5]);
        let row2 = this.client.utils.actionRow([b6, b7, b8, b9, b10]);

        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row1, row2],
            })
            .then((x: any) => this.data.set("Aloe", x));
        return;
      }

      if (setting === `avon-simple`) {
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setAuthor({
            name: `Now Playing`,
            iconURL: this.client.user.displayAvatarURL(),
          })
          .setDescription(
            `[${this.current.info.title.substring(0, 35)}](${this.client.config.voteUrl
            })`
          )
          .addFields([
            {
              name: `${this.client.emoji.simple.requester} Requester`,
              value: `${this.current.info.requester.tag}`,
              inline: true,
            },
            {
              name: `${this.client.emoji.simple.duration} Duration`,
              value: `${this.client.utils.humanize(this.current.info.length)}`,
              inline: true,
            }
          ]);

        let b1 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_pause`,
          null,
          this.client.emoji.simple.pause
        );
        let b2 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_skip`,
          null,
          this.client.emoji.simple.skip
        );
        let b3 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_loop`,
          null,
          this.client.emoji.simple.loop
        );
        let b4 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_stop`,
          null,
          this.client.emoji.simple.stop
        );
        let row2 = this.client.utils.actionRow([b1, b2, b3, b4]);

        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row2],
            })
            .then((x: any) => this.data.set("Aloe", x));
        return;
      }
      else {
        this.client.utils.updatePlayerMode(this.guild.id, "avon-simple");
        let em = this.client.utils
          .premiumEmbed(this.guild.id)
          .setAuthor({
            name: `Now Playing`,
            iconURL: this.client.user.displayAvatarURL(),
          })
          .setDescription(
            `[${this.current.info.title.substring(0, 35)}](${this.client.config.voteUrl
            })`
          )
          .addFields([
            {
              name: `${this.client.emoji.simple.requester} Requester`,
              value: `${this.current.info.requester.tag}`,
              inline: true,
            },
            {
              name: `${this.client.emoji.simple.duration} Duration`,
              value: `${this.client.utils.humanize(this.current.info.length)}`,
              inline: true,
            }
          ]);

        let b1 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_pause`,
          null,
          this.client.emoji.simple.pause
        );
        let b2 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_skip`,
          null,
          this.client.emoji.simple.skip
        );
        let b3 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_loop`,
          null,
          this.client.emoji.simple.loop
        );
        let b4 = this.client.utils.button(
          `custom_id`,
          null,
          2,
          `avon_stop`,
          null,
          this.client.emoji.simple.stop
        );
        let row2 = this.client.utils.actionRow([b1, b2, b3, b4]);

        if (set?.channelId !== this.channel.id)
          this.channel
            ?.send({
              embeds: [em],
              components: [row2],
            })
            .then((x: any) => this.data.set("Aloe", x));
        return;
      }
    });

    this.player.on("end", async () => {
      let data = await db.findOne({ guildId: this.guild.id });
      if (data) {
        this.updateQueue(this.guild, this.queue);
        let ch = this.guild.channels.cache.get(data.channelId);
        if(!ch) ch = await this.guild.channels.fetch(data.channelId).catch(() => {});
        let msg = ch.messages.cache.get(data.messageId);
        if(!msg) msg = await ch.messages.fetch(data.messageId).catch(() => {});
        if(msg)
          msg.edit({
            embeds: [
              this.client.utils
                .embed()
                .setTitle(`Nothing Playing Right Now`)
                .setURL(`${this.client.config.voteUrl}`)
                .setImage(`${this.client.config.setupBgLink}`)
                .setAuthor({
                  name: `| Now Playing`,
                  iconURL: this.guild.iconURL({ dynamic: true }),
                })
                .setFooter({
                  text: `🔥 Thanks for choosing ${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                }),
            ],
          });
      }
      try {
        this.data.get("Aloe")?.delete();
      } catch (e) {
        /** */
      }
      this.data.delete("Aloe");
      if (this.repeat === "one") {
        this.queue.unshift(this.current);
      }
      if (this.repeat === "all") {
        this.queue.push(this.current);
      }
      this.previous = this.current;
      this.current = null;
      if (getAutoplay(this.guild.id).SETTING === 1) return this.autoplay();
      else this.play();
    });
    this.player.on("closed", () => this.destroy());
  }

  get avon() {
    return this.client.api.has(this.guild.id);
  }
  public play() {
    if (!this.avon) return this.destroy();
    if (!this.queue.length) return;
    this.current = this.queue.shift();
    this.player.playTrack({ track: this.current.track });
  }
  public async destroy() {
    this.queue.length = 0;
    this.previous = null;
    this.current = null;
    this.data
      .get("Aloe")
      ?.delete()
      .catch(() => { });
      let set = await db.findOne({ guildId: this.guild.id });
    if (set) {
      this.updateQueue(this.guild, this.queue);
      let ch = this.guild.channels.cache.get(set.channelId);
      if(ch) {
        let msg = ch.messages.cache.get(set.messageId);
        if(!msg) msg = await ch.messages.fetch(set.messageId);
        if(msg) msg.edit({
          embeds: [
            this.client.utils
              .embed()
              .setTitle(`Nothing Playing Right Now`)
              .setURL(`${this.client.config.voteUrl}`)
              .setImage(`${this.client.config.setupBgLink}`)
              .setAuthor({
                name: `| Now Playing`,
                iconURL: this.guild.iconURL({ dynamic: true }),
              })
              .setFooter({
                text: `🔥 Thanks for choosing ${this.client.user.username}`,
                iconURL: this.client.user.displayAvatarURL(),
              }),
          ],
        });
      }
    }
    this.player.connection.disconnect();
    this.client.api.delete(this.guild.id);
    let data = await reconnectData.findOne({
      id: this.guild.id
    });
    if (data && data.setting === true) {
      let node = this.client.shoukaku.getNode();
      return this.client.api.reconnect(
        this.guild,
        this.guild.channels.cache.get(data.voiceId),
        this.guild.channels.cache.get(data.channelId),
        node
      );
    }
    if (this.stopped) return;
  }
  public async updateQueue(guild: any, queue: any[]) {
    let setup = await db.findOne({ guildId: guild.id });
    if (setup) {
      let ch = guild.channels.cache.get(setup.channelId);
      if(!ch) ch = await guild.channels.fetch(setup.channelId).catch(() => {});
      if (ch) {
        let q: any;
        if (queue.length === 0 || !queue.length)
          q = `Join a Voice Channel and type in your Search Query or a Url`;
        else if (queue.length < 11)
          q = queue
            .map(
              (x: any, i: number) =>
                `**${i + 1}.** ${x.info.title.substring(
                  0,
                  35
                )} .... *${this.client.utils.humanize(x.info.length)}*`
            )
            .sort()
            .join("\n");
        else
          q =
            queue
              .slice(0, 9)
              .map(
                (x: any, i: number) =>
                  `**${i + 1}.** ${x.info.title.substring(
                    0,
                    35
                  )} .... *${this.client.utils.humanize(x.info.length)}*`
              )
              .sort()
              .join("\n") +
            `\n**${this.queue.length - 10}** Songs are upcoming in the queue`;
        let msg = ch.messages.cache.get(setup.messageId);
        if(!msg) msg = await ch.messages.fetch(setup.messageId).catch(() => {});

        if(msg)  msg.edit({
            content: `__**Queue List**__\n\n${q}`,
          });
      }
    } else return;
  }

  private async autoplay() {
    if (this.queue.length) return this.play();
    let identifier: string | undefined;
    if (this.previous === null) identifier = "_XBVWlI8TsQ";
    else
      identifier =
        this.previous.info.identifier || this.current.info.identifier;
    let url = `https://youtube.com/watch?v=${identifier}&list=RD${identifier}`;
    let node = this.client.shoukaku.getNode();
    let result = await node.rest.resolve(`${url}`);
    if (!result.tracks.length) return this.player.stopTrack();
    try {
      let track =
        result.tracks[
        Math.floor(Math.random() * Math.floor(result.tracks.length))
        ];
      track.info.requester = this.client.user;
      this.current = this.client.utils.track(track);
      this.player.playTrack({ track: this.current.track });
    } catch (e) {
      this.player.stopTrack();
    }
  }
}
