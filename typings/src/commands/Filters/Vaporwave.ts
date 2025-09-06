import AloeCommand from "../../base/AloeCommand.js";

export default class Vaporwave extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "vaporwave";
    this.aliases = [];
    this.cat = "filters";
    this.dev = false;
    this.vc = true;
    this.desc = "Toggles Vaporwave filter to the player";
    this.usage = "vaporwave";
    this.vote = false;
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
        equalizer: [
          { band: 1, gain: 0.3 },
          { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 0.5 },
        tremolo: { depth: 0.3, frequency: 14 },
      });

      return message.reply({
        embeds: [
          this.client.utils
            .premiumEmbed(message.guildId)
            .setDescription(
              `${this.client.emoji.tick} Successfully **Applied Vaporwave** filter to the Player`
            ),
        ],
      });
    };
  }
}
