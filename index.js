/* Load the environment file */
require("dotenv").config();

/* Import custom client */
const {GalaxyClient} = require("./src/lib");

/* Create Discord Client */
const client = new GalaxyClient({
    fetchAllMembers: true,
    ws: {intents: ["GUILDS", "GUILD_MEMBERS"]}
});

/* Start the bot */
client.start();

/* Export the client so we can access it from other files */
module.exports.client = client;