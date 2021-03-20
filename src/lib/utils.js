const {readFileSync, readdirSync} = require("fs");

class Utils {
    /**
     * TODO: Document
     */
    constants = {
        logger: {
            magenta: "\x1b[35m",
            yellow: "\x1b[33m",
            black: "\x1b[30m",
            green: "\x1b[32m",
            white: "\x1b[37m",
            blue: "\x1b[34m",
            cyan: "\x1b[36m",
            red: "\x1b[31m",

            reset: "\x1b[0m",
            bold: "\x1b[1m"
        },
        emojis: {
            accepted: "822767038866259969",
            denied: "822767039327502376"
        }
    }

    /**
     * Slash commands array
     */
    commands = JSON.parse(readFileSync("./data/commands.json").toString());

    /**
     * Client config
     */
    config = JSON.parse(readFileSync("./data/config.json").toString());

    /**
     * TODO: Document
     * @param {*} client 
     * @param {*} interaction 
     * @param {*} data 
     */
    sendResponse = (client, interaction, data) => {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: data});
    }

    /**
     * TODO: Document
     * @param {*} client 
     * @returns this
     */
    loadCommands = async (client) => {
        const list = await client.api.applications(client.user.id).guilds(process.env.GUILD_ID).commands.get();

        // Load commands
        readdirSync("./src/commands/")
            .filter((file) => file.endsWith(".js"))
            .forEach(async (file) => {
                let command = (new (require(`../commands/${file}`))());
                client.commands.set(command.data.name, command);

                const cmd = list.find((c) => {
                    return c.name === command.data.name;
                });

                // Add the command.
                if (!cmd) return await client.api.applications(client.user.id)
                    .guilds(process.env.GUILD_ID).commands
                    .post(command);

                await client.api.applications(client.user.id)
                    .guilds(process.env.GUILD_ID).commands(cmd.id)
                    .patch(command);
            });

        return this;
    }

    /**
     * TODO: Document
     * @param {*} client 
     * @returns this
     */
    loadEvents = (client) => {
        readdirSync("./src/events")
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                let event = require(`../events/${file}`);
                client.on(event.name, event.run.bind(event, client));
            });

        return this;
    }
}

module.exports = Utils;
