const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'ask',
            this.alias = ['ask']
            this.usage = ';ask {question}'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        message.reply(commandData["ANSWERS"][Math.floor(Math.random() * commandData["ANSWERS"].length)])
    }
}