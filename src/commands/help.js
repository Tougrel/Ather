const {MessageEmbed} = require("discord.js");
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
        const embed = new MessageEmbed()
        .setColor("")

        this.client.utils.sendResponse(this.client, interaction, {
            type: 4,
            data: {
                embeds: []
            }
        });
    }
}

module.exports = ClientCommand;