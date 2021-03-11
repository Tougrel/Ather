module.exports = {
    name: "ready",
    run: (client) => {
        // load client commands
        client.utils.loadCommands(client);

        // Log that the client is ready
        console.log("[CLIENT] Client up and running!");

        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        client.ws.on("INTERACTION_CREATE", async (interaction) => {
            const command = client.commands.find((command) => command.data.name === interaction.data.name);
            if (command) command.run(client, guild, interaction);
        });
    }
}