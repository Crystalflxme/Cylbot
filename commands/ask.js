const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'ask',
            this.alias = ['ask']
            this.usage = ';ask {question}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        message.reply(commandData["ANSWERS"][Math.floor(Math.random() * commandData["ANSWERS"].length)])
    }
}