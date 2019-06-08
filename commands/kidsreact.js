const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'kidsreact',
            this.alias = ['kr']
            this.usage = ';kidsreact'
    }
 
    async run(bot, message, args) {
        const commandData = require("./commandData.json")

        message.react(commandData["EMOJIS"][Math.floor(Math.random() * commandData["EMOJIS"].length)])
    }
}