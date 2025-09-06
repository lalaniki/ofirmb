import AloeCommand from "../../base/AloeCommand.js";

export default class Pause extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "pause";
    this.aliases = [];
    this.desc = "Pauses the current track";
    this.cat = "music";
    this.vc = true;
    this.samevc = true;
    this.dev = false;
    this.manage = false;
    this.dispatcher = true;
    this.playing = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      if (dispatcher.player.paused)
        return message.reply({
          content: `${this.client.emoji.cross} Player seems to be Paused!`
        });

      await dispatcher.player.setPaused(true);
      return message.reply({
        content: `${this.client.emoji.tick} Player is Paused!`
      });
    };
  }
}
