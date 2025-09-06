import AloeCommand from "../../base/AloeCommand.js";

export default class Support extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "support";
    this.aliases = ["supp"];
    this.desc = "Provides you with the server link for the bot's support";
    this.cat = "info";
    this.exec = async (message: any, args: any, prefix: any) => {
      return message.reply({
        embeds: [
          this.client.utils.premiumEmbed(message.guild.id)
            .setDescription(`Click on the Button Below! to [Join Us](${this.client.config.server})`)
        ],
        components: [
          this.client.utils.actionRow([
            this.client.utils.button(
              `link`,
              `Invite Me`,
              null,
              null,
              `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=35184425925952&scope=applications.commands%20bot`,
              this.client.emoji.invite
            ),
            this.client.utils.button(
              `link`,
              `Support Server`,
              null,
              null,
              `${this.client.config.server}`,
              this.client.emoji.support
            ),
          ]),
        ],
      });
    };
  }
}
