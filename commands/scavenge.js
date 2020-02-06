const Discord = require("discord.js");
let scavengeCooldown = new Set()

module.exports = class test {
    constructor(){
            this.name = 'scavenge',
            this.alias = ['scavenge']
            this.usage = ';scavenge'
    }
 
    async run(bot, message, args, connection) {
        if (scavengeCooldown.has(message.author.id)) {
            message.reply("You must wait for the scavenge cooldown to end (5 minutes)!")
            return
        } else {
            const botConfig = require("./../bot-config.json")
            let pointsAmt = Math.floor(Math.random() * botConfig.MAX_WORK_AMOUNT) + 1;
            connection.query(`SELECT * FROM points WHERE id = '${message.author.id}'`, (err, rows) => {
                if (err) throw err
                let sql
                if (rows.length < 1) {
                    sql = `INSERT INTO points(id, points) VALUES ('${message.author.id}', ${pointsAmt})`
                } else {
                    let points = rows[0].points
                    sql = ` UPDATE points SET points = ${points + pointsAmt} WHERE id = '${message.author.id}'`
                }
                connection.query(sql)
            })
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                .setDescription(`${message.author} just scavenged for **${pointsAmt}** ${botConfig.SERVER_POINTS_NAME}!`)
            message.channel.send(embed);
            scavengeCooldown.add(message.author.id)
            setTimeout(() => {
                scavengeCooldown.delete(message.author.id)
            }, botConfig.POINTS_COOLDOWN * 1000)
        }
    }
}