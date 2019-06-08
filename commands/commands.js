const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'commands',
            this.alias = ['cmds'],
            this.usage = ';commands'
    }
 
    async run(bot, message, args) {
        const botConfig = require("./../bot-config.json")
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.DEFAULT_UI_COLOR)
            .setTitle("**Here are the Cylbot commands:**")
            .addField(`;commands`,"Brings up this menu.",false)
            .addField(`;help`,"Brings up the bot information.",false)
            .addField(`;ask {question}`,"Gives you a random unrelated answer.",false)
            .addField(`;coinflip`,"Flips a coin and gives you heads or tails.",false)
            .addField(`;rtd`,"Rolls the dice and gives you a random number between 1 and 6.",false)
            .addField(`;botadmin {user}`,"Gives the mentioned player the Cylbot Admin role (must be an admin yourself).",false)
            .addField(`;react`,"Places a random reaction on your last message.",false)
            .addField(`;kill {user}`,"Kills the user that you mention.",false)
            .addField(`;punch {user}`,"Punches the user that you mention.",false)
            .addField(`;slap {user}`,"Slaps the user that you mention.",false)
            .addField("-------- Economy Commands --------","These commands deal with server points.",false)
            .addField(`;work`,"Work for a random amount of coins.",false)
            .addField(`;balance {user}`,"Check the points balance of a user.",false)
            .addField(`;pay {user} {amount}`,"Send server points to another user.",false)
            .addField(`;coin {heads or tails} {bet amount}`,"If you win you double your money; if you don't you lose it.",false)
        message.reply(embed);
    }
}