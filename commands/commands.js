const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'commands',
            this.alias = ['cmds'],
            this.usage = ';commands'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        const botConfig = require("./../bot-config.json")
        var embed = new Discord.RichEmbed()
            .setColor(botConfig.DEFAULT_UI_COLOR)
            .setTitle("**Here are the Cylbot commands:**")
            .addField(`;commands`,"Brings up this menu.",false)
            .addField(`;help`,"Brings up the help menu.",false)
            .addField(`;setprefix {new prefix}`,"Sets the current prefix for the bot.",false)
            .addField(`;ask {question}`,"Gives you a random unrelated answer.",false)
            .addField(`;coinflip`,"Flips a coin and gives you heads or tails.",false)
            .addField(`;rtd`,"Rolls the dice and gives you heads or tails.",false)
            .addField(`;kidsreact`,"Places a random reaction on your last message.",false)
            .addField("-------- Economy Commands --------","These commands deal with server points.",false)
            .addField(`;work`,"Work for a random amount of coins.",false)
            .addField(`; {user}`,"Check the points balance of a user.",false)
            .addField(`;pay {user} {amount}`,"Send server points to another user.",false)
            .addField(`;coin {heads or tails} {bet amount}`,"If you win you double your money; if you don't you lose it.",false)
            // .addField(`${PREFIX}commands`,"Brings up this menu.",false)
            // .addField(`${PREFIX}help`,"Brings up the help menu.",false)
            // .addField(`${PREFIX}setprefix {new prefix}`,"Sets the current prefix for the bot.",false)
            // .addField(`${PREFIX}ask {question}`,"Gives you a random unrelated answer.",false)
            // .addField(`${PREFIX}coinflip`,"Flips a coin and gives you heads or tails.",false)
            // .addField(`${PREFIX}rtd`,"Rolls the dice and gives you heads or tails.",false)
            // .addField(`${PREFIX}kidsreact`,"Places a random reaction on your last message.",false)
            // .addField("-------- Economy Commands --------","These commands deal with server points.",false)
            // .addField(`${PREFIX}work`,"Work for a random amount of coins.",false)
            // .addField(`${PREFIX}balance {user}`,"Check the points balance of a user.",false)
            // .addField(`${PREFIX}pay {user} {amount}`,"Send server points to another user.",false)
            // .addField(`${PREFIX}coin {heads or tails} {bet amount}`,"If you win you double your money; if you don't you lose it.",false)
        message.reply(embed);
    }
}