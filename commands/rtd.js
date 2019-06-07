const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'rtd',
            this.alias = ['rtd']
            this.usage = ';rtd'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        message.reply(commandData["RTDs"][Math.floor(Math.random() * commandData["RTDs"].length)])
    }
}