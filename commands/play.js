const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'play',
            this.alias = ['playsong'],
            this.usage = ';play {youtube video}'
    }
 
    async run(bot, message, args) {
        const botConfig = require("./../bot-config.json")
        //const suffix = message.substring(1 + 4).trim();
        bot.music.bot.playFunction(message, args[1])
    }
}