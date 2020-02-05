const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'coin',
            this.alias = ['coinbet']
            this.usage = ';coin {heads or tails} {bet amount}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        let points = require("./../points.json")
        const botConfig = require("./../bot-config.json")
        if (!points[message.author.id]) return message.reply("You don't have any points to gamble with, silly!")
        if (!args[1] === "heads") return message.reply("You must put heads or tails as your bet!")
        if (!args[1] === "tails") return message.reply("You must put heads or tails as your bet!")
        if (!args[2]) return message.reply("Point amount not found!")
        let pointAmount = parseInt(args[2])
        if (!Number.isSafeInteger(pointAmount)) return message.reply("Point amount isn't a number or it is too large!")
        if (pointAmount === 0) return message.reply("You can't bet zero points, silly!")
        if(Math.sign(pointAmount) === -1) return message.reply("You can't bet negative points, silly!")
        if (points[message.author.id].points < pointAmount) return message.reply("You don't have enough points for that, silly!")
        let winningChances = Math.floor(Math.random() * 2) + 1
        points[message.author.id] = {
            points: points[message.author.id].points - pointAmount
        }
        if (winningChances === 1) {
            // Heads
            if (args[1] === "heads") {
                // Win
                points[message.author.id] = {
                    points: points[message.author.id].points + (pointAmount * 2)
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${pointAmount}** points on heads and **doubled** it to **${parseInt(args[2]) * 2}**!`,false)
                message.channel.send(embed);
            } else if (args[1] === "tails") {
                // Lose
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${pointAmount}** points on tails and **lost** it!`,false)
                message.channel.send(embed);
            }
        } else if (winningChances === 2) {
            // Tails
            if (args[1] === "tails") {
                // Win
                points[message.author.id] = {
                    points: points[message.author.id].points + (pointAmount * 2)
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${pointAmount}** points on tails and **doubled** it to **${parseInt(args[2]) * 2}**!`,false)
                message.channel.send(embed);
            } else if (args[1] === "heads") {
                // Lose
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${pointAmount}** points on heads and **lost** it!`,false)
                message.channel.send(embed);
            }
        }
        fs.writeFile("./../points.json", JSON.stringify(points), (err) => {
            if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
        })
    }
}