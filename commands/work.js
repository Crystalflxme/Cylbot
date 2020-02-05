const Discord = require("discord.js");
let workCooldown = new Set()

module.exports = class test {
    constructor(){
            this.name = 'work',
            this.alias = ['work']
            this.usage = ';work'
    }
 
    async run(bot, message, args) {
        if (workCooldown.has(message.author.id)) {
            message.reply("You must wait for the work cooldown to end (5 minutes)!")
            return
        } else {
            const fs = require("fs")
            let points = require("./../points.json")
            const botConfig = require("./../bot-config.json")
            if (!points[message.author.id]) {
                points[message.author.id] = {
                    points: 0
                }
            };
            let pointsAmt = Math.floor(Math.random() * botConfig.MAX_WORK_AMOUNT) + 1;
            points[message.author.id] = {
                points: points[message.author.id].points + pointsAmt
            };
            fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
            });
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${message.author} just worked for **${pointsAmt}** points!`,false)
            message.channel.send(embed);
            workCooldown.add(message.author.id)
            setTimeout(() => {
                workCooldown.delete(message.author.id)
            }, botConfig.POINTS_COOLDOWN * 1000)
        }
    }
}