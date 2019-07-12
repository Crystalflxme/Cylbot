const Discord = require("discord.js");
const mongoose = require("mongoose")
const EXP = require("./models/exp.js")
const { CommandHandler } = require("djs-commands")
const botSecrets = require("./../bot-secrets.json")
const botConfig = require("./bot-config.json")
const CH = new CommandHandler({
    folder: __dirname + "/commands/",
    prefix: [";"]
});
var bot = new Discord.Client()
bot.music = require("discord.js-musicbot-addon");

//mongoose.connect("mongodb://localhost:27017/EXP", {
    //useNewUrlParser: true
//})
bot.music.start(bot, {
    youtubeKey: botSecrets.YTAPI
});

bot.on("message", (message) => {
    if (message.channel.type === "dm") return
    if (message.author.type === "bot") return
    let args = message.content.split(" ")
    let command = args[0]
    let cmd = CH.getCommand(command)
    if (cmd) {
        try {
            cmd.run(bot, message, args)
        } catch(e) {
            console.log(e)
        }
    // } else if (!cmd) {
    //     let expToAdd = Math.floor(Math.random() * 10)
    //     print(expToAdd)
    //     EXP.findOne({
    //         userID: message.author.id,
    //         serverID: message.guild.id
    //     }, (err, exp) => {
    //         if (err) console.log(err)
    //         if (!exp) {
    //             const newEXP = new EXP({
    //                 userID: message.author.id,
    //                 serverID: message.guild.id,
    //                 exp: expToAdd
    //             })
    //             newEXP.save().catch(err => console.log(err))
    //         } else {
    //             exp.exp = exp.exp + expToAdd
    //             newEXP.save().catch(err => console.log(err))
    //         }
    //     })
    }
});

bot.on("ready", () => {
    bot.user.setActivity("for ;commands", {type:"WATCHING"})
    console.log(`[STARTUP] ${botConfig.BOT_NAME} ${botConfig.BOT_VERSION} started!`)
    console.log(`[STARTUP] ${botConfig.BOT_NAME} is currently running on ${bot.guilds.size} servers.`)
});

bot.login(botSecrets.TOKEN);