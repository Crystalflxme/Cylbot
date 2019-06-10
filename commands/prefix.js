const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'prefix',
            this.alias = ['setprefix','botprefix'],
            this.usage = ';prefix {new prefix}'
    }
 
    async run(bot, message, args) {
        const botConfig = require("./../bot-config.json")

        let adminRoleName = message.guild.roles.find(x => x.name == "Cylbot Admin");
        let adminRoleNameFind = message.member.roles.find(x => x.name == "Cylbot Admin");
        if (!adminRoleName) {
            message.member.guild.createRole({
                name: "Cylbot Admin",
                hoist: false,
            })
        }
        //if (!adminRoleNameFind) return message.reply("You need to be a Cylbot admin to use that command!")


        //var embed = new Discord.RichEmbed()
            //.setColor(botConfig.DEFAULT_UI_COLOR)
            //.addField("wip","wip",false)
        //message.reply(embed);
    }
}