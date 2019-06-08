const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'commands',
            this.alias = ['cmds'],
            this.usage = ';commands'
    }
 
    async run(bot, message, args) {
        const botConfig = require("./../bot-config.json")
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.DEFAULT_UI_COLOR)
            .addField("**Command List:**","https://github.com/Crystalflxme/Cylbot/wiki/Cylbot-Commands",false)
        message.reply(embed);
    }
}