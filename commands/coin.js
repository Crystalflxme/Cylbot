const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'coin',
            this.alias = ['coinbet']
            this.usage = ';coin {heads or tails} {bet amount}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        
        let exp = require("./../exp.json")
        const botConfig = require("./../bot-config.json")
        if (!exp[message.author.id]) return message.reply("You don't have any points to gamble with, silly!")
        if (!args[1] === "heads") return message.reply("You must put heads or tails as your bet!")
        if (!args[1] === "tails") return message.reply("You must put heads or tails as your bet!")
        if (!args[2]) return message.reply("Point amount not found!")
        if (!Number.isInteger(parseInt(args[2]))) return message.reply("Point amount isn't a number!")
        if (parseInt(args[2]) === 0) return message.reply("You can't bet 0 points, silly!")
        if(Math.sign(parseInt(args[2])) === -1) return message.reply("You can't bet negative points, silly!")
        if (exp[message.author.id].id >= parseInt(args[2])) return message.reply("You don't have enough points for that, silly!")
        let winningChances = Math.floor(Math.random() * 2) + 1
        //console.log(winningChances)
        if (winningChances === 1) {
            // Heads
            if (args[1] === "heads") {
                // Win
                exp[message.author.id] = {
                    exp: exp[message.author.id].exp + (parseInt(args[2]) * 2)
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on heads and **doubled** it to **${parseInt(args[2]) * 2}**!`,false)
                message.channel.send(embed);
            } else if (args[1] === "tails") {
                // Lose
                exp[message.author.id] = {
                    exp: exp[message.author.id].exp - parseInt(args[2])
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on tails and **lost** it!`,false)
                message.channel.send(embed);
            }
        } else if (winningChances === 2) {
            // Tails
            if (args[1] === "tails") {
                // Win
                exp[message.author.id] = {
                    exp: exp[message.author.id].exp + (parseInt(args[2]) * 2)
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on tails and **doubled** it to **${parseInt(args[2]) * 2}**!`,false)
                message.channel.send(embed);
            } else if (args[1] === "heads") {
                // Lose
                exp[message.author.id] = {
                    exp: exp[message.author.id].exp - parseInt(args[2])
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on heads and **lost** it!`,false)
                message.channel.send(embed);
            }
        }
        fs.writeFile("./../exp.json", JSON.stringify(exp), (err) => {
            if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
        })
    }
}