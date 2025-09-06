import { Client, Partials } from "discord.js";
import AloeConfig from "../config/Config.js";
import AloeEmoji from "../config/Emoji.js";
import AloeShoukaku from "../api/Shoukaku.js";
import AloeApi from "../api/Api.js";
import AloeEvents from "./Events.js";
import AloeCommands from "./Commands.js";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import AloeUtils from "./Utils.js";
import AloeLogger from "./Logger.js";
import AloeSpotify from "../api/Spotify.js";
import AloeKazagumo from "../api/Kazagumo.js";
import { connect } from "mongoose";

export default class Aloe extends Client {
  [x: string]: any;
  constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildInvites",
        "GuildVoiceStates",
        "MessageContent",
        "GuildPresences"
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
      ],
      allowedMentions: {
        repliedUser: false,
        parse: ["everyone", "roles", "users"],
      },
      failIfNotExists: true,
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
    });
    this.config = new AloeConfig();
    this.emoji = new AloeEmoji(this);
    this.shoukaku = new AloeShoukaku(this);
    this.kazagumo = new AloeKazagumo(this);
    this.spotify = new AloeSpotify(this);
    this.cluster = new ClusterClient(this);
    this.logger = new AloeLogger(this);
    this.utils = new AloeUtils(this);
    this.api = new AloeApi(this);
    this.events = new AloeEvents(this).loadEvents();
    this.commands = new AloeCommands(this).loadCommands();
  }
  async start() {
    await connect(this.config.mongoURL, {
      autoIndex: false,
      family: 4
    }).then(() => {
      this.logger.ready(`Mongoose Database Connected`);
    }).catch((e: any) => {
      console.log(`Error in mongoose: ${e}`);
    });

    return super.login(this.config.token);
  }
}
