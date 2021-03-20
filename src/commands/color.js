const {SlashCommand, Utils} = require("../lib");

class ClientCommand extends SlashCommand {
    constructor() {
        super({
            data: new Utils().commands.color
        });
    }

    async run(client, guild, interaction) {
        this.options = interaction.data.options;
        this.user = interaction.member.user.id;
        this.member = guild.member(this.user);
        this.guild = guild;
        this.client = client;
        this.roles = client.utils.config.colors;

        await this.manageRole(interaction);
    }

    async manageRole(interaction) {
        const xmark = this.client.emojis.cache.get(this.client.utils.constants.emojis.denied);
        const cmark = this.client.emojis.cache.get(this.client.utils.constants.emojis.accepted);

        // If role does not exist stop here
        if (!this.options[0].value) return this.client.utils.sendResponse(this.client, interaction, {
            type: 3,
            data: {content: `${xmark} Role ${this.options[0].value} not found!`, flags: 64}
        });

        // Check if user has any roles provided in the array and remove them
        for (let ID of this.roles)
            if (this.member.roles.cache.has(ID))
                await this.member.roles.remove(ID);

        // Add the new role to user
        await this.member.roles.add(this.options[0].value).catch((err) => console.error(err));
        this.client.utils.sendResponse(this.client, interaction, {
            type: 3,
            data: {
                content: `${cmark} Successfully added **${this.guild.roles.cache.get(this.options[0].value).name}** color to ${this.member}!`,
                flags: 64
            }
        });
    }
}

module.exports = ClientCommand;