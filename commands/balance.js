const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'balance',
            this.alias = ['bal']
            this.usage = ';balance {user}'
    }
 
    async run(bot, message, args, connection) {
        const botConfig = require("./../bot-config.json")
        let findUser = message.guild.member(message.mentions.users.first())
        let pointAmt = 0
        if (!findUser) {
            connection.query(`SELECT * FROM points WHERE id = '${message.author.id}'`, (err, rows) => {
                if (err) throw err
                if (rows.length < 1) {
                    let sql = `INSERT INTO points(id, points) VALUES ('${message.author.id}', 0)`
                    connection.query(sql)
                    pointAmt = 0
                } else {
                    pointAmt = rows[0].points
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} currently has **${pointAmt}** ${botConfig.SERVER_POINTS_NAME}!`)
                message.channel.send(embed);
            })
        } else if (findUser) {
            connection.query(`SELECT * FROM points WHERE id = '${findUser.id}'`, (err, rows) => {
                if (err) throw err
                if (rows.length < 1) {
                    let sql = `INSERT INTO points(id, points) VALUES ('${findUser.id}', 0)`
                    connection.query(sql)
                    pointAmt = 0
                } else {
                    pointAmt = rows[0].points
                }
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${findUser} currently has **${pointAmt}** ${botConfig.SERVER_POINTS_NAME}!`)
                message.channel.send(embed);
            })
        }
    }
}