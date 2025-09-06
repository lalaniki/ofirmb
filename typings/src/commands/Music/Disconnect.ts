import AloeCommand from "../../base/AloeCommand.js";

export default class Disconnect extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "disconnect";
    this.desc = "Disconnects the bot from a voice channel";
    this.aliases = ["leave"];
    this.cat = "music";
    this.manage = false;
    this.dev = false;
    this.vc = true;
    this.samevc = true;
    this.dispatcher = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      dispatcher.destroy();

      return message.reply({
        content: `${this.client.emoji.tick} Successfully \`Destroyed\` The Player`
      });
    };
  }
}
