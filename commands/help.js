const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'help',
            this.alias = ['h'],
            this.usage = ';help'
    }
 
    async run(bot, message, args) {
        const botConfig = require("./../bot-config.json")
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.DEFAULT_UI_COLOR)
            .setThumbnail(bot.user.avatarURL)
            .setTitle(`**${botConfig.BOT_NAME} ${botConfig.BOT_VERSION}**`)
            .setFooter("Created by Crystalflame")
            .addField("Description:",botConfig.BOT_DESCRIPTION,false)
            .addField("Created:",bot.user.createdAt,false)
            .addField("Invite Link:","||https://discordapp.com/api/oauth2/authorize?client_id=586696865052098581&permissions=8&scope=bot||")
        message.reply(embed);
    }
}