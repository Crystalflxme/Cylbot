const Discord = require("discord.js");

module.exports = class test {
    constructor(){
            this.name = 'botadmin',
            this.alias = ['ba'],
            this.usage = ';botadmin {user}'
    }
 
    async run(bot, message, args) {
        const fs = require("fs")
        const commandData = require("./commandData.json")

        let adminRoleName = message.guild.roles.find(x => x.name == "Cylbot Admin");
        let adminRoleNameFind = message.member.roles.find(x => x.name == "Cylbot Admin");
        if (!adminRoleName) {
            message.member.guild.createRole({
                name: "Cylbot Admin",
                hoist: false,
            })
        }
        if (!adminRoleNameFind) return message.reply("You need to be a Cylbot admin to use that command!")
        let adminUser = message.guild.member(message.mentions.users.first())
        if (!adminUser) return message.reply("User not found!")
        adminUser.addRole(message.member.guild.roles.find("name", "Cylbot Admin"))
    }
}