const {SlashCommand, Utils} = require("../lib");

class ClientCommand extends SlashCommand {
    constructor() {
        super({
            data: new Utils().commands.role
        });
    }

    async run(client, guild, interaction) {
        this.client = client;
        this.options = interaction.data.options;
        this.user = interaction.member.user.id;
        this.member = guild.member(this.user);

        const role = client.utils.config.roleCommand.find((r) => {
            return r.name === this.options[0].value;
        });

        if (this.options[0].value === role.name) await this.giveRole(interaction, role.id);
    }

    async giveRole(interaction, role) {
        const xmark = this.client.emojis.cache.get(this.client.utils.constants.emojis.denied);
        const cmark = this.client.emojis.cache.get(this.client.utils.constants.emojis.accepted);

        // If role does not exist stop here
        if (!role) return this.client.utils.sendResponse(this.client, interaction, {
            type: 3,
            data: {content: `${xmark} Role ${this.options[0].value} not found!`, flags: 64}
        });

        // If the user doesn't have the role add it
        if(!this.member.roles.cache.has(role)) await this.member.roles.add(role).catch((err) => console.error(err));
        // else remove it
        await this.member.roles.remove(role).catch((err) => console.error(err));

        // Respond to the interaction
        this.client.utils.sendResponse(this.client, interaction, {
            type: 3,
            data: {content: `${cmark} Successfully added ${this.options[0].value} role to ${this.member}!`, flags: 64}
        });
    }
}

module.exports = ClientCommand;