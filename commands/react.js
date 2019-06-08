const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'react',
            this.alias = ['kidsreact','teensreact','adultsreact','eldersreact']
            this.usage = ';react'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        message.react(commandData["EMOJIS"][Math.floor(Math.random() * commandData["EMOJIS"].length)])
    }
}