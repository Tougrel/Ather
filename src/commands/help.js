const {SlashCommand, Utils} = require("../lib");

class ClientCommand extends SlashCommand {
    constructor() {
        super({
            data: new Utils().commands.help
        });
    }

    async run(client, guild, interaction) {
        this.options = interaction.data.options;
        this.user = interaction.member.user.id;
        this.member = guild.member(this.user);
        this.guild = guild;
        this.client = client;

        await this.help(interaction);
    }

    async help(interaction) {
        this.client.utils.sendResponse(this.client, interaction, {
            type: 4, // DEPRECATED TYPE (this will be changed once the type is removed by Discord)
            data: {
                content: "> :ringed_planet: **Galaxy Commander Help**\n\n:sparkles: Help - *Shows information about Galaxy Commander's commands*\n:sparkles: Color - *Give yourself a color*\n:sparkles: Role - *Give yourself a role*",
                flags: 64
            }
        });
    }
}

module.exports = ClientCommand;