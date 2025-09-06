import AloeCommand from "../../base/AloeCommand.js";
import ms from "ms";
import { cpu } from "systeminformation";
import { cpus, totalmem, platform } from "node:os";
import moment from "moment";
import { version } from "discord.js";
export default class Stats extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "stats";
    this.aliases = ["st", "stat"];
    this.desc = "Informs you about the current statitics of the bot";
    this.usage = "stats";
    this.cat = "info";
    this.exec = async (message: any, args: any, prefix: any) => {
      let em = this.client.utils
        .premiumEmbed(message.guildId)
        .setAuthor({
          name: `${this.client.user.username}-Stats`,
          iconURL: this.client.user.displayAvatarURL()
        })
        .addFields([
          {
            name: `**GENERAL:**`,
            value: `\`\`\`↳ Version    :: v1.0.0\n↳ Creation Date :: ${moment.utc(this.client.user.createdTimestamp).format("DD/MM/YYYY, hh:mm:ss")}\n↳ Shards      :: ${message.guild.shardId}/${this.client.cluster.info.TOTAL_SHARDS}\n↳ Clusters   :: ${this.client.cluster.id}/${this.client.cluster.count}\n↳ WS Ping    :: ${this.client.ws.ping}ms\n↳ Servers    :: ${await this.client.cluster.broadcastEval((x: any) => x.guilds.cache.size).then((r: any) => r.reduce((a: any, b: any) => a + b, 0))} Servers\n↳ Users      :: ${await this.client.cluster
              .broadcastEval((c: any) =>
                c.guilds.cache
                  .filter((x: any) => x.available)
                  .reduce((a: any, g: any) => a + g.memberCount, 0)
              )
              .then((r: any) =>
                r.reduce((acc: any, memberCount: any) => acc + memberCount, 0)
              )} Users\n↳ Players    :: ${this.client.shoukaku.nodes.get('node-00').stats.playingPlayers}/${this.client.shoukaku.nodes.get('node-00').stats.players}\`\`\``
          },
          {
            name: `**STATISTICS:**`,
            value: `\`\`\`↳ Discord.js :: v${version}\n↳ Node.js    :: ${process.version}\n↳ Memory     :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(totalmem() / 1024 / 1024).toFixed(2)}mb\n↳ Uptime     :: ${moment.duration(message.client.uptime).humanize()}\n↳ CPU        :: ${cpus()[0].model}\n↳ Platform   :: ${platform()}\`\`\``
          }
        ]);

      // let cpuUsage: any;
      // let cpuFree: any;
      // const lol =
      //   Object.values(cpus()[0].times).reduce((a: any, b: any) => a + b, 0) *
      //   100;
      // const lol2 = (process.cpuUsage().user + process.cpuUsage().system) * 1000;
      // cpuUsage = (lol2 / lol).toFixed(2);
      // cpuFree = (100 - cpuUsage).toFixed(2);

      await message.reply({
        embeds: [em],
      });

      return;
    };
  }
}
