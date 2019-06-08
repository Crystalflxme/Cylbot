const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'punch',
            this.alias = ['wack']
            this.usage = ';punch {user}'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        let punchUser = message.guild.member(message.mentions.users.first())
        if (!punchUser) return message.reply("User not found!")
        if (punchUser.id != message.author.id) {
            let chosenMsg = commandData["PUNCHMSGs"][Math.floor(Math.random() * commandData["PUNCHMSGs"].length)]
            let msgRev = chosenMsg.replace(/{user1}/g, message.author)
            message.channel.send(msgRev.replace(/{user2}/g, punchUser))
        } else if (punchUser.id === message.author.id) {
            message.reply(commandData["PUNCHMSGs2"][Math.floor(Math.random() * commandData["PUNCHMSGs2"].length)])
        }
    }
}