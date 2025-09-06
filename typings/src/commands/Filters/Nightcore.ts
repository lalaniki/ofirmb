import AloeCommand from "../../base/AloeCommand.js";

export default class NightCore extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "nightcore";
    this.aliases = [];
    this.cat = "filters";
    this.manage = false;
    this.vote = false;
    this.desc = "Toggles nightcore filter to the player";
    this.usage = "nightcore";
    this.vc = true;
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
        timescale: { speed: 1.3, pitch: 1.3, rate: 1.0 },
      });

      return message.reply({
        embeds: [
          this.client.utils
            .premiumEmbed(message.guildId)
            .setDescription(
              `${this.client.emoji.tick} Successfully **Applied Nightcore** filter to the player`
            ),
        ],
      });
    };
  }
}
