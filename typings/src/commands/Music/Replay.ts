import AloeCommand from "../../base/AloeCommand.js";

export default class Replay extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "replay";
    this.aliases = ["restart"];
    this.cat = "music";
    this.vc = true;
    this.desc = "Restarts playing the current track";
    this.samevc = true;
    this.dev = false;
    this.dispatcher = true;
    this.playing = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      dispatcher.player.seekTo(0);
      return message.reply({
        content: `${this.client.emoji.tick} Restarted the Song....`
      });
    };
  }
}
