import ms from "ms";
import AloeCommand from "../../base/AloeCommand.js";

export default class Seek extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "seek";
    this.aliases = [];
    this.cat = "music";
    this.vc = true;
    this.samevc = true;
    this.desc = "Seeks the player to the provided timestamp";
    this.usage = "seek <time>\nexample: seek 1m";
    this.dispatcher = true;
    this.playing = true;
    this.exec = async (
      message: any,
      args: any,
      prefix: any,
      dispatcher: any
    ) => {
      if (!args[0]) {
        return message.reply({
          content: `Correct Option: seek<Stamp>
                For example: \`${prefix}seek 1m40s\``,
        });
      }
      let seek = ms(`${args.slice(0).join(" ")}`);
      if (seek > dispatcher.current.info.length) {
        return message.reply({
          content: `${this.client.emoji.cross} Please provide me a valid Timestamp!`
        });
      }
      if (seek < 0) seek = 0;

      await dispatcher.player.seekTo(seek);

      return await message.react(this.client.emoji.tick);
    };
  }
}
