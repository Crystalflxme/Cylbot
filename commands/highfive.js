const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'highfive',
            this.alias = ['high-five']
            this.usage = ';highfive {user}'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")
        let highfiveUser = message.guild.member(message.mentions.users.first())
        if (!highfiveUser) return message.reply("User not found!")
        if (highfiveUser.id != message.author.id) {
            let chosenMsg = commandData["HIGHFIVEMSGs"][Math.floor(Math.random() * commandData["HIGHFIVEMSGs"].length)]
            let msgRev = chosenMsg.replace(/{user1}/g, message.author)
            if (highfiveUser.id == bot.user.id) {
                message.channel.send(msgRev.replace(/{user2}/g, highfiveUser) + " Ayyy, thanks bro! ✋")
            } else {
                message.channel.send(msgRev.replace(/{user2}/g, highfiveUser))
            }
        } else if (highfiveUser.id === message.author.id) {
            message.reply(commandData["HIGHFIVEMSGs2"][Math.floor(Math.random() * commandData["HIGHFIVEMSGs2"].length)])
        }
    }
}