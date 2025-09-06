import AloeCommand from "../../base/AloeCommand.js";

export default class AloeLatency extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "latency";
    this.cat = "info";
    this.desc = "Informs you about the bot's latency";
    this.aliases = ["ping", "pong"];
    this.exec = async (message: any, prefix: any, args: any) => {
      return message.reply({
        embeds: [
          this.client.utils.premiumEmbed(message.guildId)
            .setDescription(
              `I am working with **${this.client.ws.ping}** Ms Latency!`
            )
        ]
      })
    };
  }
}
