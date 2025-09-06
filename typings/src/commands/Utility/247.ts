import AloeCommand from "../../base/AloeCommand.js";
import reconnectData from "../../database/reconnectData.js";

export default class AloeAll extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "247";
    this.aliases = ["247-7", "24/7"];
    this.cat = "utility";
    this.premium = {
      guild: false,
      user: false,
    };
    this.vc = true;
    this.samevc = true;
    this.usage = "24/7 [on/enable | off/disable]";
    this.desc = "Toggles 24/7 mode of the player";
    this.vote = false;
    this.dispatcher = true;
    this.playing = false;
    this.exec = async (message: any, args: any, prefix: any) => {
      if (
        !message.member.permissions.has("ManageGuild") &&
        !client.config.owners.includes(message.author.id)
      )
        return message.reply({
          embeds: [
            this.client.utils
              .premiumEmbed(message.guild.id)
              .setDescription(
                `${this.client.emoji.cross} You need \`Manage Guild\` permissions to use this command`
              )
              .setTimestamp(),
          ],
        });
      let data = await reconnectData.findOne(
        {
          id: message.guild.id
        }
      );
      if (!args[0]) {
        if (data && data.setting === true) {
          reconnectData.updateOne(
            { id: message.guild.id },
            {
              $set: {
                setting: false,
                channelId: null,
                voiceId: null
              }
            },
            { upsert: true }
          ).then(() => {
            return message.reply({
              content: `${this.client.emoji.cross} I have \`Disabled\` My 24/7 Mode. I will **Not** stay in the voice channel!`
            })
          }).catch((e: any) => {
            return message.reply({
              content: `Error while doing that! Please try again!`
            });
          });

        } else if (!data || (data && data.setting === false)) {

          reconnectData.updateOne(
            { id: message.guildId },
            {
              $set: {
                setting: true,
                channelId: message.channel.id,
                voiceId: message.member.voice.channel.id
              }
            },
            {
              upsert: true
            }
          ).then(() => {
            return message.reply({
              content: `${this.client.emoji.tick} I have \`Enabled\` my 24/7 Mode. I will stay in the voice channel.`
            });
          }).catch((e: any) => {
            return message.reply({
              content: `Error while doing that! Please try again!`
            });
          })
        }
      } else if (["enable", "on"].includes(args[0].toLowerCase())) {
        if (data && data.setting === true)
          return message.reply({
            content:
              `${this.client.emoji.exclamation} My 24/7 Mode is Already \`Enabled\``
          });
        else {
          reconnectData.updateOne(
            {
              id: message.guildId
            },
            {
              $set: {
                setting: true,
                channelId: message.channel.id,
                voiceId: message.member.voice.channel.id
              }
            },
            {
              upsert: true
            }
          ).then(() => {
            return message.reply({
              content: `${this.client.emoji.tick} I have \`Enabled\` my 24/7 Mode. I will stay in the voice channel.`
            });
          }).catch((e: any) => {
            return message.reply({
              content: `Error while doing that Please try again!`,
            });
          });
        }
      } else if (["off", "disable"].includes(args[0].toLowerCase())) {
        if (data && data.setting === false)
          return message.reply({
            content: `${this.client.emoji.exclamation} My 24/7 Mode is Already \`Disabled\``
          });
        else {
          reconnectData.updateOne(
            {
              id: message.guildId
            },
            {
              $set: {
                setting: false,
                channelId: null,
                voiceId: null
              }
            },
            {
              upsert: true
            }
          ).then(() => {
            return message.reply({
              content: `${this.client.emoji.cross} I have \`Disabled\` My 24/7 Mode. I will **Not** stay in the voice channel!`
            });
          }).catch((e: any) => {
            return message.reply({
              content: `Error while doing that! Please try again!`
            });
          });
        }
      }
    };
  }
}
