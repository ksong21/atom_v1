require("dotenv").config();
const {Client, MessageEmbed} = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Client();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const prefix = "$";

async function start() {
    await client.login(DISCORD_BOT_TOKEN);

    client.on("ready", () => {
        console.log("Logged in at " + client.readyAt + " as " + client.user.tag);
        client.user.setActivity("$help", {type: "LISTENING"});
    });
    
    client.on("message", (message) => {
        if (!message.author.bot) {
            console.log(message.author.tag + " said " + message.content);

            if (message.content.startsWith(prefix)) {
                const commandName = message.content.trim().split(" ")[0].substring(prefix.length);
                let embed;

                switch (commandName) {
                    case "help":
                        embed = new MessageEmbed()
                            .setColor("#FF69B4")
                            .setTitle("Help")
                            .setDescription("A brief overview of the bot.")
                            .addFields(
                                {
                                    name: "Commands",
                                    value: ""
                                    + "\n$play [YouTube URL] - Joins user voice channel and plays video as audio"
                                    + "\n$stop - Stops playing audio and leaves voice channel"
                                    + "\n$roll - Rolls a number from 1 to 6"
                                },
                                {
                                    name: "Invite",
                                    value: "Click HERE (not working) to add the bot to your server!"
                                }
                            );
                        message.channel.send(embed);
                        break;
                    case "play":
                        const url = message.content.trim().split(" ")[1];
                        try {
                            var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                            if (url.match(regExp)) {
                                if (message.member.voice.channelID != null) {
                                    embed = new MessageEmbed()
                                        .setColor("#FF69B4")
                                        .setDescription("<@" + message.author.id + "> playing");
                                    message.channel.send(embed);
                                    message.member.voice.channel.join().then(connection => {
                                        const dispatcher = connection.play(ytdl(url));
                                        dispatcher.on("finish", () => {
                                            message.guild.me.voice.channel.leave();
                                        });
                                    });
                                } else {
                                    console.log("Can't play because no voice channel was found");
                                    embed = new MessageEmbed()
                                        .setColor("#FF69B4")
                                        .setDescription("<@" + message.author.id + "> you must be in a voice channel!");
                                    message.channel.send(embed);
                                }
                            } else {
                                console.log("Invalid YouTube URL");
                                embed = new MessageEmbed()
                                        .setColor("#FF69B4")
                                        .setDescription("<@" + message.author.id + "> please provide a valid YouTube URL!");
                                message.channel.send(embed);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                        break;
                    case "stop":
                        embed = new MessageEmbed()
                            .setColor("#FF69B4")
                            .setDescription("<@" + message.author.id + "> stoping music player");
                        message.channel.send(embed);
                        message.guild.me.voice.channel.leave();
                        break;
                    case "roll":
                        const number = Math.ceil(Math.random() * 6);
                        embed = new MessageEmbed()
                            .setColor("#FF69B4")
                            .setDescription("<@" + message.author.id + "> you rolled a " + number + "!");
                        message.channel.send(embed);
                        break;
                    default:
                        console.log("Command " + message.content + " doesn't match");
                        message.reply("idk that command.");
                        break;
                }
            }
        }
    });
}
start();