import {readdirSync} from "fs";

module.exports = class Utils {
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
    }
    commands = JSON.parse(readdirSync("./data/commands.json").toString());

    sendResponse = (client, interaction, data) => {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: data});
    }

    loadCommands = (client) => {
        // Load commands
        readdirSync("./dist/commands/")
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                let command = (new (require(`../commands/${file}`).default)());
                client.commands.set(command.data.name, command);

                client.api.applications(client.user.id)
                    .guilds(process.env.GUILD_ID).commands.get()
                    .then(async (data) => {
                        const cmd = data.find((c) => {
                            return c.name === command.data.name;
                        });

                        // Add the command.
                        if (!cmd) return await client.api.applications(client.user.id)
                            .guilds(process.env.GUILD_ID).commands
                            .post({data: command.data});

                        await client.api.applications(client.user.id)
                            .guilds(process.env.GUILD_ID).commands(cmd.id)
                            .patch({data: command.data});
                    });
            });

        return this;
    }

    loadEvents = (client) => {
        readdirSync("./dist/events")
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                let event = require(`../events/${file}`);
                client.on(event.name, event.run.bind(event, client));
            });

        return this;
    }
}