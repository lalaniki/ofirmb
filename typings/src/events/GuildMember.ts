import AloeEvent from "../base/AloeEvent.js";

export default class GuildMemberEvent extends AloeEvent {
    [x: string]: any;
    constructor(client: any) {
        super(client);
        this.name = 'guildMemberRemove';
        this.run = async (member: any) => {
            if (this.client.utils.checkServerPremStatus(member.guild.id) === false) return;
            let guild_activator = this.client.utils.checkActivator(member.guild.id);
            if (guild_activator === null) return;
            if (guild_activator === member.user.id) {
                this.client.utils.deleteServerPrem(member.guild.id);
                return;
            }
        }
    }
}