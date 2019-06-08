const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'rtd',
            this.alias = ['rolldice','rollthedice']
            this.usage = ';rtd'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        message.reply(commandData["RTDs"][Math.floor(Math.random() * commandData["RTDs"].length)])
    }
}