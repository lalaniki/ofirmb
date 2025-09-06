import AloeCommand from "../../base/AloeCommand.js";

export default class Pause extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "resume";
    this.aliases = [];
    this.desc = "Resumes the track if paused";
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
      if (!dispatcher.player.paused)
        return message.reply({
          content: `${this.client.emoji.cross} Player is Not Paused!`
        });

      await dispatcher.player.setPaused(false);
      return message.reply({
        content: `${this.client.emoji.tick} Player is Resumed!`
      });
    };
  }
}
