const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'coinflip',
            this.alias = ['cf']
            this.usage = ';coinflip'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        message.reply(commandData["COINFLIPS"][Math.floor(Math.random() * commandData["COINFLIPS"].length)])
    }
}