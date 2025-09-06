import { PermissionFlagsBits } from "discord.js";
import { disable247, get247Set } from "./db/settings.js";
import reconnectData from "../database/reconnectData.js";

export default function reconnection(client: any) {
  client.guilds.cache.forEach(async (x: any) => {
    let data = await reconnectData.findOne({
      id: x.id
    });
    if (data) {
      if (x.channels.cache.get(data.voiceId)) {
        let node = client.shoukaku.getNode();
        if (
          x.members.me
            .permissionsIn(x.channels.cache.get(data.voiceId))
            .has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])
        ) {
          await client.api.reconnect(
            x,
            x.channels.cache.get(data.voiceId),
            x.channels.cache.get(data.channelId),
            node
          );
        } else {
          await reconnectData.deleteOne({
            id: x.id
          });
        };
      } else await reconnectData.deleteOne({
        id: x.id
      });
    }
    else return;
  });
}
