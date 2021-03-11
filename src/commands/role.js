const { SlashCommand, Utils} = require("../lib");

class ClientCommand extends SlashCommand {
    constructor() {
        super({
            data: new Utils().commands.help
        });
    }

    async run(client, guild, interaction) {
        this.client = client;
        this.options = interaction.data.options;
        this.user = interaction.member.user.id;
        this.member = guild.member(this.user);

        if (this.options[0].value === "allies") await this.giveRole(interaction, "778897323672469524");
        else if (this.options[0].value === "enemies") await this.giveRole(interaction, "791398491318255636");
        else if (this.options[0].value === "neutral") await this.giveRole(interaction, "791398978235138059");
        else if (this.options[0].value === "danger") await this.giveRole(interaction, "799317934626439238");
    }

    async giveRole(interaction, role) {
        // If role does not exist stop here
        if (!role) return this.client.utils.sendResponse(this.client, interaction, {
            type: 4,
            data: {content: `:x: Role ${this.options[0].value} not found!`}
        });

        if (role !== "799317934626439238")
            // Check if user has any roles provided in the array and remove them
            for (const id in ["791398978235138059", "778897323672469524", "791398491318255636"]) {
                if (this.member.roles.cache.has(id)) await this.member.roles.remove(id);
            }

        // Add the new role to user
        await this.member.roles.add(role).catch((err) => console.error(err));
        this.client.utils.sendResponse(this.client, interaction, {
            type: 4,
            data: {content: `:white_check_mark: Successfully added ${this.options[0].value} role to ${this.member}!`}
        });
    }
}

module.exports = ClientCommand;