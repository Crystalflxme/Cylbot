const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'kill',
            this.alias = ['murder']
            this.usage = ';kill {user}'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")

        let killUser = message.guild.member(message.mentions.users.first())
        if (!killUser) return message.reply("User not found!")
        if (killUser.id != message.author.id) {
            let chosenMsg = commandData["KILLMSGs"][Math.floor(Math.random() * commandData["KILLMSGs"].length)]
            let msgRev = chosenMsg.replace(/{user1}/g, message.author)
            if (killUser.id == bot.user.id) {
                message.channel.send(msgRev.replace(/{user2}/g, killUser) + " Why me? 😭")
            } else {
                message.channel.send(msgRev.replace(/{user2}/g, killUser))
            }
        } else if (killUser.id === message.author.id) {
            message.reply(commandData["KILLMSGs2"][Math.floor(Math.random() * commandData["KILLMSGs2"].length)])
        }
    }
}