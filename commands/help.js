module.exports = class test {
    constructor(){
            this.name = 'help',
            this.alias = ['h'],
            this.usage = ';help'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        const botConfig = require("./../bot-config.json")
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.DEFAULT_UI_COLOR)
            .setThumbnail(bot.user.avatarURL)
            .setTitle(`**${botConfig.BOT_NAME} ${botConfig.BOT_VERSION}**`)
            .setFooter("Created by Crystalflame")
            .addField("Description:",botConfig.BOT_DESCRIPTION,false)
            .addField("Created:",bot.user.createdAt,false)
        message.reply(embed);
    }
}