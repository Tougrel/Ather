import {Collection} from "discord.js";
import {Logger, Utils} from "./index";

/**
 * Custom made client using Discord.js
 * @type {module.Client}
 */
module.exports = class Client extends Client {
    /**
     * TODO: Add description
     * @param props
     * @returns {Promise<void>}
     */
    async constructor(props) {
        super(props);
        await super().login(process.env.TOKEN);

        this.commands = new Collection();
        this.logs = new Logger();
        this.utils = new Utils();
    }

    /**
     * Start client
     */
    start() {
        new Utils().loadEvents(this);
    }
}