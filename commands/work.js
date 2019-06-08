// FIX COOLDOWN!!!

const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'work',
            this.alias = ['work']
            this.usage = ';work'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        let workCooldown = new Set()

        let exp = require("./../exp.json")
        const botConfig = require("./../bot-config.json")
        if (!exp[message.author.id]) {
            exp[message.author.id] = {
                exp: 0
            }
        };
        let expAmt = Math.floor(Math.random() * botConfig.MAX_WORK_AMOUNT) + 1;
        if (workCooldown.has(message.author.id)) {
            message.reply("You must wait for the work cooldown to end (5 minutes)!")
            message.delete()
            return
        } else {
            exp[message.author.id] = {
                exp: exp[message.author.id].exp + expAmt
            };
            fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
                if (err) console.log(`[SAVE POINTS ERROR] ${err} in ${message.guild.name} (${message.guild.id})`)
            });
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${message.author} just worked for **${expAmt}** points!`,false)
            message.channel.send(embed);
            workCooldown.add(message.author.id)
            setTimeout(() => {
                workCooldown.delete(message.author.id)
            }, botConfig.POINTS_COOLDOWN * 1000)
        }
    }
}