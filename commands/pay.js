const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'pay',
            this.alias = ['p']
            this.usage = ';pay {user} {amount}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")

        let exp = require("./../exp.json")
        const botConfig = require("./../bot-config.json")
        if (!exp[message.author.id]) return message.reply("You don't have any points, silly!")
        let payUser = message.guild.member(message.mentions.users.first())
        if (!payUser) return message.reply("User not found!")
        if (!args[2]) return message.reply("Point amount not found!")
        let pointAmount = parseInt(args[2])
        if (!Number.isInteger(pointAmount)) return message.reply("Point amount isn't a number!")
        if (exp[message.author.id].id >= pointAmount) return message.reply("You don't have enough points for that, silly!")
        if (pointAmount === 0) return message.reply("You can't pay 0 points, silly!")
        if(Math.sign(pointAmount) === -1) return message.reply("You can't pay negative points, silly!")
        if (!exp[payUser.id]) {
            exp[payUser.id] = {
                exp: 0
            }
        };
        let payEXP = exp[payUser.id].exp
        let selfEXP = exp[message.author.id].exp
        exp[message.author.id] = {
            exp: selfEXP - pointAmount
        }
        exp[payUser.id] = {
            exp: payEXP + pointAmount
        }
        fs.writeFile("./../exp.json", JSON.stringify(exp), (err) => {
            if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
        })
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.SERVER_POINTS_UI_COLOR)
            .addField("**🌟 Server Points 🌟**",`${message.author} just gave ${payUser} **${args[2]}** points!`,false)
        message.channel.send(embed);
    }
}