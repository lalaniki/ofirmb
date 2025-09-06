import AloeCommand from "../../base/AloeCommand.js";

export default class AloeSkip extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "skip";
    this.aliases = ["s"];
    this.cat = "music";
    this.dev = false;
    this.desc = "Skips the current track of the player";
    this.manage = false;
    this.vc = true;
    this.samevc = true;
    this.premium = {
      guild: false,
      user: false,
    };
    this.dispatcher = true;
    this.playing = true;
    this.vote = false;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      await dispatcher.player.stopTrack();
      return message.reply({
        content: `${this.client.emoji.tick} Successfully \`Skipped\` The Track!`
      });
    };
  }
}
