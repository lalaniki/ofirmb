import AloeCommand from "../../base/AloeCommand.js";

export default class Help extends AloeCommand {
  constructor(client: any) {
    super(client);
    this.name = "help";
    this.aliases = [];
    this.cat = "utility";
    this.desc = "Provides with the help menu of the bot";
    this.usage = "help [command/category]";
    this.vc = false;
    this.dev = false;
    this.premium = {
      guild: false,
      user: false,
    };
    this.exec = async (message: any, args: any, prefix: any) => {
      if (!args[0]) {
        let embed = this.client.utils
          .premiumEmbed(message.guildId)
          .setAuthor({
            name: `Help Menu`,
            iconURL: this.client.user.displayAvatarURL()
          })
          .setDescription(
            `This is the all commands list of the bot ${this.client.user.username}`
          )
          .addFields([
            {
              name: `Music [${this.client.commands.messages.filter(
                (x: any) => x.cat && x.cat === "music"
              ).size
                }]`,
              value: `${this.client.commands.messages
                .filter((x: any) => x.cat && x.cat === "music")
                .map((x: any) => `\`${x.name}\``)
                .sort()
                .join(", ")}`,
            },
            {
              name: `Filters [${this.client.commands.messages.filter(
                (x: any) => x.cat && x.cat === "filters"
              ).size
                }]`,
              value: `${this.client.commands.messages
                .filter((x: any) => x.cat && x.cat === "filters")
                .map((x: any) => `\`${x.name}\``)
                .sort()
                .join(", ")}`,
            },
            {
              name: `Utility [${this.client.commands.messages.filter(
                (x: any) => x.cat && x.cat === "utility"
              ).size
                }]`,
              value: `${this.client.commands.messages
                .filter((x: any) => x.cat && x.cat === "utility")
                .map((x: any) => `\`${x.name}\``)
                .sort()
                .join(", ")}`,
            },
            {
              name: `Information [${this.client.commands.messages.filter(
                (x: any) => x.cat && x.cat === "info"
              ).size
                }]`,
              value: `${this.client.commands.messages
                .filter((x: any) => x.cat && x.cat === "info")
                .map((x: any) => `\`${x.name}\``)
                .sort()
                .join(", ")}`,
            },
            {
              name: `Links`,
              value: `**[Support Server](${this.client.config.server})** | **[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands)** | **[Premium](${this.client.config.server})** | **[Vote](${this.client.config.voteUrl})**`,
            },
          ])
          .setFooter({
            text: `Made with 🔥 By Aloe Development`,
            iconURL: message.guild.iconURL({ dynamic: true }),
          })
          .setThumbnail(this.client.user.displayAvatarURL());

        return message.channel.send({
          embeds: [embed]
        });
      } else {
        let cmd =
          this.client.commands.messages.get(args[0]) ||
          this.client.commands.messages.find(
            (c: any) => c.aliases && c.aliases.includes(args[0])
          );

        if (args[0].toLowerCase() === "music")
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guild.id)
                .setDescription(
                  `__**Music Commands**__ **[${this.client.commands.messages.filter(
                    (x: any) => x.cat && x.cat === "music"
                  ).size
                  }]**\n${this.client.commands.messages
                    .filter((x: any) => x.cat && x.cat === "music")
                    .map((y: any) => `\`${y.name}\``)
                    .sort()
                    .join(", ")}`
                )
                .setAuthor({
                  name: `${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                })
                .setFooter({
                  text: `Requested By: ${message.author.tag}`,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                }),
            ],
          });

        if (
          args[0].toLowerCase() === `filters` ||
          args[0].toLowerCase() === `filter`
        )
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guild.id)
                .setDescription(
                  `__**Filter Commands**__ **[${this.client.commands.messages.filter(
                    (x: any) => x.cat && x.cat === "filters"
                  ).size
                  }]**\n${this.client.commands.messages
                    .filter((x: any) => x.cat && x.cat === "filters")
                    .map((y: any) => `\`${y.name}\``)
                    .sort()
                    .join(", ")}`
                )
                .setAuthor({
                  name: `${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                })
                .setFooter({
                  text: `Requested By: ${message.author.tag}`,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                }),
            ],
          });

        if (
          args[0].toLowerCase() === `info` ||
          args[0].toLowerCase() === `information`
        )
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guild.id)
                .setDescription(
                  `__**Informative Commands**__ **[${this.client.commands.messages.filter(
                    (x: any) => x.cat && x.cat === "info"
                  ).size
                  }]**\n${this.client.commands.messages
                    .filter((x: any) => x.cat && x.cat === "info")
                    .map((y: any) => `\`${y.name}\``)
                    .sort()
                    .join(", ")}`
                )
                .setAuthor({
                  name: `${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                })
                .setFooter({
                  text: `Requested By: ${message.author.tag}`,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                }),
            ],
          });

        if (args[0].toLowerCase() === `utility`)
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guild.id)
                .setDescription(
                  `__**Utility Commands**__ **[${this.client.commands.messages.filter(
                    (x: any) => x.cat && x.cat === "utility"
                  ).size
                  }]**\n${this.client.commands.messages
                    .filter((x: any) => x.cat && x.cat === "utility")
                    .map((y: any) => `\`${y.name}\``)
                    .sort()
                    .join(", ")}`
                )
                .setAuthor({
                  name: `${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                })
                .setFooter({
                  text: `Requested By: ${message.author.tag}`,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                }),
            ],
          });

        if (
          args[0].toLowerCase() === `dev` ||
          args[0].toLowerCase() === `owner`
        )
          return message.reply({
            embeds: [
              this.client.utils
                .premiumEmbed(message.guild.id)
                .setDescription(
                  `__**Owner Commands**__ **[${this.client.commands.messages.filter(
                    (x: any) => x.cat && x.cat === "dev"
                  ).size
                  }]**\n${this.client.commands.messages
                    .filter((x: any) => x.cat && x.cat === "dev")
                    .map((y: any) => `\`${y.name}\``)
                    .sort()
                    .join(", ")}`
                )
                .setAuthor({
                  name: `${this.client.user.username}`,
                  iconURL: this.client.user.displayAvatarURL(),
                })
                .setFooter({
                  text: `Requested By: ${message.author.tag}`,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                }),
            ],
          });

        if (
          !cmd &&
          ![
            "music",
            "filters",
            "filter",
            "info",
            "information",
            "utility",
            "dev",
            "owner",
          ].includes(args[0].toLowerCase())
        )
          return message.reply({
            embeds: [
              this.client.utils
                .errorEmbed()
                .setDescription(
                  `${this.client.emoji.cross
                  } There is no such command "${args.join(" ")}"`
                ),
            ],
          });

        let em = this.client.utils
          .premiumEmbed(message.guildId)
          .setDescription(
            `\`\`\`js\n<> = Required Arguments | [] = Optional Arguements\`\`\``
          );
        em.addFields([
          {
            name: `Description:`,
            value: `${cmd.desc ? cmd.desc : "No Description Provided"}`,
          },
          {
            name: `Usage`,
            value: `${cmd.usage ? cmd.usage : "No Usage Provided"}`,
            inline: true,
          },
          {
            name: `Aliases`,
            value: `${cmd.aliases.length
              ? cmd.aliases
                .map((x: any) => `\`${x}\``)
                .sort()
                .join(", ")
              : "No Aliases"
              }`,
            inline: true,
          },
        ])
          .setFooter({
            text: `Requested By: ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setAuthor({
            name: `${this.client.user.username}`,
            iconURL: this.client.user.displayAvatarURL(),
          });

        return message.reply({
          embeds: [em],
        });
      }
    };
  }
}
