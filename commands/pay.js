const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'pay',
            this.alias = ['send','send-xels','pay-xels']
            this.usage = ';pay {user} {amount}'
    }
 
    async run(bot, message, args, connection) {
        const botConfig = require("./../bot-config.json")
        let payUser = message.guild.member(message.mentions.users.first())
        if (!payUser) return message.reply("User not found!")
        if (payUser == message.guild.member(message.author)) return message.reply("You can't pay yourself, silly!")
        if (!args[2]) return message.reply(`${botConfig.SERVER_POINTS_NAME} amount not found!`)
        let pointAmount = parseInt(args[2])
        if (!Number.isSafeInteger(pointAmount)) return message.reply(`${botConfig.SERVER_POINTS_NAME} amount isn't a number or it is too large!`)
        if (pointAmount === 0) return message.reply(`You can't pay zero ${botConfig.SERVER_POINTS_NAME}, silly!`)
        if(Math.sign(pointAmount) === -1) return message.reply(`You can't pay negative ${botConfig.SERVER_POINTS_NAME}, silly!`)
        let completed = false
        let cancel = false
        connection.query(`SELECT * FROM points WHERE id = '${message.author.id}'`, (err, rows) => {
            if (err) throw err
            let sql
            if (rows.length < 1) {
                sql = `INSERT INTO points(id, points) VALUES ('${message.author.id}', 0)`
                cancel = true
            } else {
                if (rows[0].points >= pointAmount) {
                    sql = ` UPDATE points SET points = ${rows[0].points - pointAmount} WHERE id = '${message.author.id}'`
                } else {
                    cancel = true
                }
            }
            if (cancel != true) {
                connection.query(sql)
            }
            completed = true
        })
        cont()
        function cont(){
            if (completed){
                if (cancel) {
                    return message.reply(`You don't have enough ${botConfig.SERVER_POINTS_NAME} for that, silly!`)
                }
                connection.query(`SELECT * FROM points WHERE id = '${payUser.id}'`, (err, rows) => {
                    if (err) throw err
                    let sql
                    if (rows.length < 1) {
                        sql = `INSERT INTO points(id, points) VALUES ('${payUser.id}', ${pointAmount})`
                    } else {
                        sql = ` UPDATE points SET points = ${rows[0].points + pointAmount} WHERE id = '${payUser.id}'`
                    }
                    connection.query(sql)
                })
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .setTitle(`**${bot.emojis.get("675022811395260433")}  ${botConfig.SERVER_POINTS}  ${bot.emojis.get("675022811395260433")}**`)
                    .setDescription(`${message.author} just gave ${payUser} **${pointAmount}** ${botConfig.SERVER_POINTS_NAME}!`)
                message.channel.send(embed);
            } else {
                setTimeout(cont, 100);
            }
        }
    }
}