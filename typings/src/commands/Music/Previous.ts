import AloeCommand from "../../base/AloeCommand.js";

export default class Previous extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "previous";
    this.aliases = [];
    this.cat = "music";
    this.vc = true;
    this.samevc = true;
    this.vote = false;
    this.desc = "Plays the previous track of the queue and skips the current";
    this.usage = "previous";
    this.dispatcher = true;
    this.premium = {
      guild: false,
      user: false,
    };
    this.playing = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      if (dispatcher.previous === null)
        return message.reply({
          content: `${this.client.emoji.cross} There is no Previous Song in the Queue!`
        });
      else {
        dispatcher.queue.unshift(dispatcher.previous);
        dispatcher.player.stopTrack();
        return message.reply({
          content: `${this.client.emoji.tick} Playing the Previous Track....`
        });
      }
    };
  }
}
