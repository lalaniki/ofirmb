export default class AloeConfig extends Object {
  token: string;
  prefix: string;
  nodes: object[];
  spotiId: string;
  owners: string[];
  spotiSecret: string;
  spotiNodes: object[];
  webhooks: object;
  supportId: string;
  color: string;
  server: string;
  voteUrl: string;
  voteApi: string;
  setupBgLink: string;
  mongoURL: string;
  constructor() {
    super();
    this.token =
      "MTA4MjUzODA4ODc5MTgxMDA2OA.GEXGQ2.8D5j7k2NDKtzrk5S-a3uFBa4Y5k_uPV3dMYF0I";
    this.prefix = "+";
    this.nodes = [
      {
        name: `node-00`,
        url: `bali.weissx.com:14007`,
        auth: `youshallnotpass`,
        secure: false,
      },
    ];
    this.voteApi =
      "";
    this.webhooks = {
      guildCreate:
        "https://discord.com/api/webhooks/1196510022977458298/m2CerIK_z62P5KAi1pk1SiGx4Pq1JNWVqTnCHJc1TWu3ZXRjSBmTSdh4kWkn_Sm4JN5d",
      guildDelete:
        "https://discord.com/api/webhooks/1196510724348981268/bOGxsSvEbNChhFw7j_h2xvWfpxePewZNVJJfnqhmjB9qc-ckuQtAOPyUD1RcLJ2qZRWS",
      Cmds: "https://discord.com/api/webhooks/1196510869643870319/xXml8rnS9WYKAdePxUu-9bWqcbCbcXu3dtODrdsRtw_NIe4n40utVpEmZ4gV-zXqa-T1",
    };
    this.server = "https://discord.gg/gdvZEcgP5J";
    this.spotiId = "4b2a3f3c14a041378cae75799597d349";
    this.spotiSecret = "00f4ccf43c6546a088f4e170bbc3f362";
    this.owners = ["765841266181144596","548192290003353631"];
    this.color = "#ff0000";
    this.supportId = "";
    this.mongoURL = "mongodb+srv://ofira:2n5BFLiqvQHYbgKf@ofira.l3b4yve.mongodb.net/?retryWrites=true&w=majority";
    this.spotiNodes = [
      {
        id: `node-00`,
        host: `lavalink.jirayu.pw`,
        port: 2343,
        password: `youshallnotpass`,
        secure: false,
      },
    ];
    this.voteUrl = "https://discord.gg/aloe";
    this.setupBgLink =
      "https://media.discordapp.net/attachments/1179094111098249277/1193913686759329884/Cassette_Tape.gif?ex=65b7ac44&is=65a53744&hm=713ee210b955dea613a28538ed25f7fa96ec02cf6ea24be5374355956f5dfaa1&=&width=533&height=400";
  }
}
