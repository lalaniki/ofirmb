import AloeCommand from "../../base/AloeCommand.js";

export default class China extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "china";
    this.aliases = [];
    this.cat = "filters";
    this.manage = false;
    this.vote = false;
    this.vc = true;
    this.desc = "Toggles China filter to the player";
    this.usage = "china";
    this.samevc = true;
    this.dispatcher = true;
    this.playing = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      await dispatcher.player.setFilters({
        timescale: {
          speed: 0.75,
          pitch: 1.25,
          rate: 1.15,
        },
      });

      return message.reply({
        embeds: [
          this.client.utils
            .premiumEmbed(message.guildId)
            .setDescription(
              `${this.client.emoji.tick} Successfully **Applied China** filter to the player`
            ),
        ],
      });
    };
  }
}
