const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'coin',
            this.alias = ['coin-bet']
            this.usage = ';coin {heads or tails} {bet amount}'
    }
 
    async run(bot, message, args, connection) {
        const fs = require("fs")
        let points = require("./../points.json")
        const botConfig = require("./../bot-config.json")
        if (!points[message.author.id]) return message.reply(`You don't have any ${botConfig.SERVER_POINTS_NAME} to gamble with, silly!`)
        if (!args[1] === "heads") return message.reply("You must put heads or tails as your bet!")
        if (!args[1] === "tails") return message.reply("You must put heads or tails as your bet!")
        if (!args[2]) return message.reply("Point amount not found!")
        let pointAmount = parseInt(args[2])
        if (!Number.isSafeInteger(pointAmount)) return message.reply(`${botConfig.SERVER_POINTS_NAME} amount isn't a number or it is too large!`)
        if (pointAmount === 0) return message.reply(`You can't bet zero ${botConfig.SERVER_POINTS_NAME}, silly!`)
        if(Math.sign(pointAmount) === -1) return message.reply(`You can't bet negative ${botConfig.SERVER_POINTS_NAME}, silly!`)
        if (points[message.author.id].points < pointAmount) return message.reply(`You don't have enough ${botConfig.SERVER_POINTS_NAME} for that, silly!`)
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
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} just bet **${pointAmount}** ${botConfig.SERVER_POINTS_NAME} on heads and **doubled** it to **${parseInt(args[2]) * 2}**!`)
                message.channel.send(embed);
            } else if (args[1] === "tails") {
                // Lose
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} just bet **${pointAmount}** ${botConfig.SERVER_POINTS_NAME} on tails and **lost** it!`)
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
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} just bet **${pointAmount}** ${botConfig.SERVER_POINTS_NAME} on tails and **doubled** it to **${parseInt(args[2]) * 2}**!`)
                message.channel.send(embed);
            } else if (args[1] === "heads") {
                // Lose
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} just bet **${pointAmount}** ${botConfig.SERVER_POINTS_NAME} on heads and **lost** it!`)
                message.channel.send(embed);
            }
        }
        fs.writeFile("./../points.json", JSON.stringify(points), (err) => {
            if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
        })
    }
}