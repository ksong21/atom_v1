require("dotenv").config();
const {Client} = require("discord.js");
// const ytdl = require('ytdl-core');
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
            const msg = message.content;

            if (msg.startsWith(prefix)) {
                const commandName = msg.trim().split(" ")[0].substring(prefix.length);

                switch (commandName) {
                    case "help":
                        message.channel.send("```Commands:"
                        + "\n$help - Lists commands"
                        + "\n$roll - Rolls a number from 1 to 6"
                        + "\n\nIn development:"
                        + "\n$play [YouTube URL] - Joins user voice channel and plays video as audio"
                        + "\n$stop - Stops playing and leaves voice channel```"
                        );
                        break;
                    case "play":
                        message.member.voice.channel.join().then(connection => {
                            //connection.play(ytdl("https://www.youtube.com/watch?v=6Joyj0dmkug&ab_channel=CartmanHD"));
                        });
                        break;
                    case "stop":
                        message.member.voice.channel.leave();
                        break;
                    case "roll":
                        const number = Math.ceil(Math.random() * 6);
                        message.reply("you rolled a " + number + "!");
                        break;
                    default:
                        console.log("Command " + msg + " doesn't match");
                        message.reply("idk that command.");
                        break;
                }
            }
        }
    });
}
start();