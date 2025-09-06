import AloeCommand from "../../base/AloeCommand.js";
import prefixData from "../../database/prefixData.js";

export default class Prefix extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "set-prefix";
    this.aliases = ["prefix", "setprefix"];
    this.cat = "utility";
    this.desc = "Helps getting a custom-prefix for a guild";
    this.vc = false;
    this.samevc = false;
    this.manage = false;
    this.dev = false;
    this.premium = {
      guild: false,
      user: false,
    };
    this.dispatcher = false;
    this.playing = false;
    this.vote = false;
    this.exec = async (message: any, args: any, prefix: any) => {
      if (!args[0])
        return message.reply({
          content: `Current Prefix for the server Is: \`${prefix}\``,
        });
      if (
        !message.member.permissions.has("ManageGuild") &&
        !this.client.config.owners.includes(message.author.id)
      )
        return message.reply({
          content: `${this.client.emoji.cross} You are missing: \`Manage Guild\` Permissions!`
        });

      if (args[1])
        return message.reply({
          content: `${this.client.emoji.exclamation} Please remove the Whitespaces Trails!`
        });

      if (args[0].length > 3)
        return message.reply({
          content: `${this.client.emoji.exclamation} Prefix can't be of length Greater Than 3!`
        });

      prefixData.updateOne(
        { id: message.guild.id },
        {
          $set: {
            prefix: args[0]
          }
        },
        { upsert: true }
      ).then(() => {
        return message.reply({
          embeds: [
            this.client.utils
              .premiumEmbed(message.guild.id)
              .setTitle(`Updated Prefix`)
              .setDescription(
                `${this.client.emoji.tick} Successfully **Updated** Guild's Prefix to: \`${args[0]}\``
              ),
          ],
        });
      }).catch(e => {
        return message.reply({
          content: `Error While doing that: ${e.message}`
        });
      });
    };
  }
}
