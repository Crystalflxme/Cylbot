const Discord = require("discord.js");
const { CommandHandler } = require("djs-commands")
const botSecrets = require("./bot-secrets.json")
const botConfig = require("./bot-config.json")
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: [';', 'cyl;']
});
var bot = new Discord.Client()

bot.on("message", (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if(!cmd) return;
    try{
        cmd.run(bot,message,args)
    }catch(e){
        console.log(e)
    }
});

bot.on("ready", () => {
    bot.user.setActivity("for ;cmds", {type:"WATCHING"})
    console.log(`[STARTUP] ${botConfig.BOT_NAME} ${botConfig.BOT_VERSION} started!`)
    console.log(`[STARTUP] ${botConfig.BOT_NAME} is currently running on ${bot.guilds.size} servers.`)
});

bot.login(botSecrets.TOKEN);