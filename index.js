const Discord = require("discord.js");
const ms = require("ms");
const YTDL = require("ytdl-core");

const TOKEN = "MzgwMTg5ODE4NDQzMDA1OTUy.DaKPZQ.oxYLdTv-IdAnhuU-YZRBgytbbrA";
const PREFIX = "=";

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    'No',
    'Maybe',
]

var products = [
    "https://cdn.discordapp.com/attachments/429709723500150786/429710092057968650/ae.png",
    "https://cdn.discordapp.com/attachments/429709723500150786/429710143928795181/cp.png",
    "https://cdn.discordapp.com/attachments/429709723500150786/429712478382063646/u.png",
    "https://cdn.discordapp.com/attachments/429709723500150786/429712655498870784/alts.png",
    "https://cdn.discordapp.com/attachments/429709723500150786/429712677531549716/bz_1.png",
    "https://cdn.discordapp.com/attachments/430113069386039316/430119514164690945/ucape_png.png"
]

var bot = new Discord.Client;

var servers = {};



bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", "greetings").sendMessage(member.toString() + " Welcome to GFX Lab Enjoy Your Stay");

    member.addRole(member.guild.roles.find("name", "Members"));
});

bot.on("guildMemberRemove", function (member) {
    member.guild.channels.find("name", "greetings").sendMessage(member.toString() + " Fair Well Good Friend");

    member.removeRole(member.guild.roles.find("name", "Members"));
});

bot.on("ready", function () {
    console.log("Ready for use :)");
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "shop":
            message.channel.sendMessage("<#429689024383418386>");
            break;
        case "examples":
            message.channel.sendMessage("<#429709723500150786>");
            break;
        case "about":
            var embed = new Discord.RichEmbed()
                .addField("Server Info", "**This discord server is for chilling out and buying high quality and cheap GFX.**")
                .setColor('aqua')
            message.channel.sendEmbed(embed);
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("**Can't read that**");
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("**Please provide a link**");
                return;
                message.delete();
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("**You must be in a voice channel**");
                return;
                message.delete();
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            message.channel.sendMessage("**Thank you for your request we have added the song to the queue! :)**");

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);
            });
            message.delete();
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            message.channel.sendMessage("**I have skipped the song for you! :)**");
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.sendMessage("**Bye now! :(**");
            break;
        case "product":
            var randomItem = products[Math.floor(Math.random() * products.length)];
            message.channel.sendMessage(randomItem);
            break;
            message.delete();
        case "kick":
            var display_3 = message.content.split(message.mentions.members.first()).slice(1);
            var reason_3 = args.slice(1).join('');
            if (reason_3s.length < 1) return message.channel.sendMessage('**You must provide a reason.**').catch(console.error);
            if (!message.member.hasPermission("KICK_MEMBERS")) { message.channel.sendMessage("**I am sorry but you don't you have permission**"); var x = 0; } else { x = 1; }
            if (x == 1) {
                let member = message.mentions.members.first();
                member.kick();
                const embedkick = new Discord.RichEmbed()
                    .setColor(0x00AE86)
                    .setTimestamp()
                    .addField('**Action**', '**Kick**')
                    .addField('**User**', `${message.mentions.members.first()}`)
                    .addField('**Moderator:**', `${message.author.username}#${message.author.discriminator}`)
                    .addField("**Reason:**", `${display_3}`);
                member.guild.channels.find("name", "mod-log").sendEmbed(embedkick);
            }
            message.delete();
            break;
        case "ban":
            var display_2 = message.content.split(message.mentions.members.first()).slice(1);
            var reason_2 = args.slice(1).join('');
            if (reason_2.length < 1) return message.channel.sendMessage('**You must provide a reason.**').catch(console.error);
            if (!message.member.hasPermission("BAN_MEMBERS")) { message.channel.sendMessage("**I am sorry but you don't you have permission**"); var x = 0; } else { x = 1; }
            if (x == 1) {
                let member = message.mentions.members.first();
                member.kick();
                const embedban = new Discord.RichEmbed()
                    .setColor(0x00AE86)
                    .setTimestamp()
                    .addField('**Action**', '**Ban**')
                    .addField('**User**', `${message.mentions.members.first()}`)
                    .addField('**Moderator:**', `${message.author.username}#${message.author.discriminator}`)
                    .addField("**Reason:**", `${display_2}`);
                member.guild.channels.find("name", "mod-log").sendEmbed(embedban);
            }
            message.delete();
            break;
        case "mute":
            let member = message.mentions.members.first();
            if(!member) return message.reply(`**You have not mentioned a user to mute!**`)
            let muteRole = message.guild.roles.find(`name`, `Muted`);
            if(!muteRole) return message.reply(`**You have not created a role called Muted!**`)
            let params = message.content.split(` `).slice(1);
            let time = params[1];
            if(!time) return message.reply(`Please add a time!`)
            if(member.hasPermissions(`MANAGE_MESSAGES`)) return message.reply(`**Can not mute that user!**`)
            var display_ = message.content.split(message.mentions.members.first()).slice(1);
            var reason_ = args.slice(1).join('');
            if (reason_.length < 1) return message.channel.sendMessage('**You must provide a reason.**').catch(console.error);

            member.addRole(muteRole.id);
            const embedmute = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('**Action**', '**Mute**')
                .addField('**User**', `${message.mentions.members.first()}`)
                .addField('**Moderator:**', `${message.author.username}#${message.author.discriminator}`)
                .addField("**Time of/Reason:**", `${display_}`);
            member.guild.channels.find("name", "mod-log").sendEmbed(embedmute);

            setTimeout(function(){
              member.removeRole(muteRole.id);
                const embedmute = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('**Action**', '**Unmute**')
                .addField('**User**', `${message.mentions.members.first()}`)
                .addField('**Moderator:**', `${message.author.username}#${message.author.discriminator}`);
            member.guild.channels.find("name", "mod-log").sendEmbed(embedmute);
            }, ms(time));
            message.delete();
            break;
        case "warn":
            let reason = args.slice(1).join('');
            if (reason.length < 1) return message.channel.sendMessage('**You must provide a reason.**').catch(console.error);
            if (message.mentions.users.size < 1) return message.channel.sendMessage('**You must mention to warn them.**').catch(console.error);
            let display = message.content.split(message.mentions.members.first()).slice(1);
            const embedwarn = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('**Action**', '**Warning**')
                .addField('**User**', `${message.mentions.members.first()}`)
                .addField('**Moderator:**', `${message.author.username}#${message.author.discriminator}`)
                .addField("**Reason:**", `${display}`);
            message.mentions.members.first().guild.channels.find("name", "mod-log").sendEmbed(embedwarn);
            message.delete();
            break;
        case "unmute":
            if (!message.member.hasPermission("MANAGE_MESSAGES")) { var x = 0; message.channel.sendMessage("I am sorry but you don't you have permission"); } else { x = 1; }
            var mem = message.mentions.members.first();
            if (message.guild.roles.find("name", "Muted")) if (x==1) {
                mem.removeRole(message.guild.roles.find("name", "Muted")).then(() => {
                    member.guild.channels.find("name", "mod-log").sendMessage(member.toString() + " **has been unmuted**");
                });

            }
            message.delete();
            break;
        case "purge":
            if (!message.member.hasPermission("MANAGE_MESSAGES")) { var x = 0; message.channel.sendMessage("**I am sorry but you don't you have permission**"); } else { x = 1; }
            if (x == 1) {
                var mc = message.content.split(" ")[1];
                message.channel.bulkDelete(mc);
            }
            message.delete();
            break;
        case "clear":
            if (!message.member.hasPermission("MANAGE_MESSAGES")) { var x = 0; message.channel.sendMessage("**I am sorry but you don't you have permission**"); } else { x = 1; }
            if (x == 1) {
                var member_ = message.mentions.members.first();
                message.channel.bulkDelete(member_);
            }
            message.delete();
            break;
        case "modhelp":
            message.channel.sendMessage("Check your DM's I have sent you the list of commands there.");
            var modhelp_mute = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Mutes the member so said person can't chat or speak in voice channels.`)
                .setTitle(`**Command:** Mute`)
                .setFooter(`**Usage:** =mute <@member> <duration> <reason>`);
            message.author.sendEmbed(modhelp_mute);
            var modhelp_unmute = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Unmutes any muted member so allows them to speak in voice channels and text channels.`)
                .setTitle(`**Command:** Unmute`)
                .setFooter(`**Usage:** =unmute <@member>`);
            message.author.sendEmbed(modhelp_unmute);
            var modhelp_kick = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Kicks the mentioned user/client from the discord server.`)
                .setTitle(`**Command:** Kick`)
                .setFooter(`**Usage:** =kick <@member> <reason>`);
            message.author.sendEmbed(modhelp_kick);
            var modhelp_ban = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Removes the user/client form the dsicord server but is not able to come back until unbanned.`)
                .setTitle(`**Command:** Ban`)
                .setFooter(`**Usage:** =ban <@member> <reason>`);
            message.author.sendEmbed(modhelp_ban);
            var modhelp_purge = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Removes messages from the channel you use the command in and removes as many messages you want.`)
                .setTitle(`**Command:** Purge`)
                .setFooter(`**Usage:** =purge <number>`);
            message.author.sendEmbed(modhelp_purge);
            var modhelp_warn = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** Warns the member for there actions.`)
                .setTitle(`**Command:** Warn`)
                .setFooter(`**Usage:** =warn <@member> <reason>`);
            message.author.sendEmbed(modhelp_warn);
            message.delete();
            break;
        case "commands":
            var commands = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`**Description:** This is a list of our commands on the server.`)
                .setTitle(`**Server Commands**`)
                .setFooter(`For staff do =modhelp for your commands and how to use them`)
                .addField(`**Moderation**`, `Kick\nBan\nMute\nUnmute\nWarn\nPurge`, true)
                .addField(`**Fun Items**`, `8ball`, true)
                .addField(`**Music**`, `Play\nStop\nSkip`, true)
                .addField(`**Helpful Commands**s`, `Shop\nExamples\nProduct`, true);
            message.channel.sendEmbed(commands);
            break;
        default:
            message.channel.sendMessage("Invalid Command");
    }
});

bot.login(TOKEN);
