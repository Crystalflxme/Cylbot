const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'balance',
            this.alias = ['bal']
            this.usage = ';balance {user}'
    }
 
    async run(bot, message, args) {
        let points = require("./../points.json")
        const botConfig = require("./../bot-config.json")
        let findUser = message.guild.member(message.mentions.users.first())
        if (!findUser) {
            if (!points[message.author.id]) return message.reply("You don't have any points, silly!")
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${message.author} currently has **${points[message.author.id].points}** points!`,false)
            message.channel.send(embed);
        }
        if (findUser) {
            if (!points[findUser.id]) return message.reply(`${findUser} doesn't have any points, silly!`)
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${findUser} currently has **${points[findUser.id].points}** points!`,false)
            message.channel.send(embed);
        }
    }
}