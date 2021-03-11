const moment = require("moment");
const Utils = require("./logger");

module.exports = class Logger {
    info(text) {
        console.log(
            new Utils().constants.logger.bold +
            `[ ${moment(new Date()).format("HH:mm DD/MM/YYYY")} ] ${new Utils().constants.logger.cyan}INFO ` +
            new Utils().constants.logger.reset + "» " + text
        );
    }

    error(text) {
        console.log(
            new Utils().constants.logger.bold +
            `[ ${moment(new Date()).format("HH:mm DD/MM/YYYY")} ] ${new Utils().constants.logger.red}ERROR ` +
            new Utils().constants.logger.reset + "» " + text
        );
    }

    debug(text) {
        console.log(
            new Utils().constants.logger.bold +
            `[ ${moment(new Date()).format("HH:mm DD/MM/YYYY")} ] ${new Utils().constants.logger.magenta}DEBUG ` +
            new Utils().constants.logger.reset + "» " + text
        );
    }

    warning(text) {
        console.log(
            new Utils().constants.logger.bold +
            `[ ${moment(new Date()).format("HH:mm DD/MM/YYYY")} ] ${new Utils().constants.logger.yellow}DEBUG ` +
            new Utils().constants.logger.reset + "» " + text
        );
    }
}