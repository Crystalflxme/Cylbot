const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'slap',
            this.alias = ['hit']
            this.usage = ';slap {user}'
    }
 
    async run(bot, message, args) {
        const commandData = require("./command-data.json")
        let slapUser = message.guild.member(message.mentions.users.first())
        if (!slapUser) return message.reply("User not found!")
        if (slapUser.id != message.author.id) {
            let chosenMsg = commandData["SLAPMSGs"][Math.floor(Math.random() * commandData["SLAPMSGs"].length)]
            let msgRev = chosenMsg.replace(/{user1}/g, message.author)
            if (slapUser.id == bot.user.id) {
                message.channel.send(msgRev.replace(/{user2}/g, slapUser) + " Owwww! Why? 😭")
            } else {
                message.channel.send(msgRev.replace(/{user2}/g, slapUser))
            }
        } else if (slapUser.id === message.author.id) {
            message.reply(commandData["SLAPMSGs2"][Math.floor(Math.random() * commandData["SLAPMSGs2"].length)])
        }
    }
}