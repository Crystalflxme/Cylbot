const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'coinflip',
            this.alias = ['flipcoin','flipacoin']
            this.usage = ';coinflip'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        message.reply(commandData["COINFLIPS"][Math.floor(Math.random() * commandData["COINFLIPS"].length)])
    }
}