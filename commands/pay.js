const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'pay',
            this.alias = ['send','sendpoints','paypoints']
            this.usage = ';pay {user} {amount}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        let points = require("./../points.json")
        const botConfig = require("./../bot-config.json")
        if (!points[message.author.id]) return message.reply("You don't have any points, silly!")
        let payUser = message.guild.member(message.mentions.users.first())
        if (!payUser) return message.reply("User not found!")
        if (payUser == message.guild.member(message.author)) return message.reply("You can't pay yourself, silly!")
        if (!args[2]) return message.reply("Point amount not found!")
        let pointAmount = parseInt(args[2])
        if (!Number.isSafeInteger(pointAmount)) return message.reply("Point amount isn't a number or it is too large!")
        if (pointAmount === 0) return message.reply("You can't pay zero points, silly!")
        if(Math.sign(pointAmount) === -1) return message.reply("You can't pay negative points, silly!")
        if (points[message.author.id].points < pointAmount) return message.reply("You don't have enough points for that, silly!")
        if (!points[payUser.id]) {
            points[payUser.id] = {
                points: 0
            }
        };
        let payPoints = points[payUser.id].points
        let selfPoints = points[message.author.id].points
        points[message.author.id] = {
            points: selfPoints - pointAmount
        }
        points[payUser.id] = {
            points: payPoints + pointAmount
        }
        fs.writeFile("./../points.json", JSON.stringify(points), (err) => {
            if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
        })
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.SERVER_POINTS_UI_COLOR)
            .addField("**🌟 Server Points 🌟**",`${message.author} just gave ${payUser} **${pointAmount}** points!`,false)
        message.channel.send(embed);
    }
}