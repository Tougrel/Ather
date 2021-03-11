const {Client, Collection} = require("discord.js");
const {Utils} = require("./");

/**
 * Custom made client using Discord.js
 * @type {module.Client}
 */
class GalaxyClient extends Client {
    /**
     * TODO: Add description
     * @param props
     * @returns {Promise<void>}
     */
    constructor(props) {
        super(props);
        this.login(process.env.TOKEN);

        this.commands = new Collection();
        this.utils = new Utils();
    }

    /**
     * Start client
     */
    start() {
        new Utils().loadEvents(this);
    }
}

module.exports = GalaxyClient;