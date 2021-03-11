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

        // Define roles
        this.roles = [
            "802159531882709022",
            "802160131566731314",
            "802160132293132309",
            "802160141465026621",
            "802160613782454274",
            "802160615333822545",
            "808754557110714428",
            "808754663729266758",
            "808754831267201094",
            "808754950606684241",
            "808755178475880459"
        ];

        await this.manageRole(interaction);
    }

    async manageRole(interaction) {
        // If role does not exist stop here
        if (!this.options[0].value) return this.client.utils.sendResponse(this.client, interaction, {
            type: 4,
            data: {content: `:x: Role ${this.options[0].value} not found!`}
        });

        // Check if user has any roles provided in the array and remove them
        for (let ID of this.roles)
            if (this.member.roles.cache.has(ID))
                await this.member.roles.remove(ID);

        // Add the new role to user
        await this.member.roles.add(this.options[0].value).catch((err) => console.error(err));
        this.client.utils.sendResponse(this.client, interaction, {
            type: 4,
            data: {content: `:white_check_mark: Successfully added **${this.guild.roles.cache.get(this.options[0].value).name}** color to ${this.member}!`}
        });
    }
}

module.exports = ClientCommand;