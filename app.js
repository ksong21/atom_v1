require("dotenv").config();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const {Client} = require("discord.js");
const client = new Client();
const prefix = "!";

async function start() {
    await client.login(DISCORD_BOT_TOKEN);

    client.on("ready", () => {
        console.log("Logged in at " + client.readyAt + " as " + client.user.tag);
        // client.user.setActivity('discord.js', {type: 'PLAYING'});
    });
    
    client.on("message", (message) => {
        if (!message.author.bot) {
            console.log(message.author.tag + " said " + message.content);
            const msg = message.content;

            if (msg.startsWith(prefix)) {
                const commandName = msg.split(" ")[0].substring(prefix.length);
                console.log(commandName);

                switch (commandName) {
                    case "roll":
                        const number = Math.ceil(Math.random() * 7);
                        message.reply("You rolled a " + number + "!");
                        break;
                    default:
                        console.log("Command " + msg + " doesn't match");
                        message.channel.send("Idk that command.");
                        break;
                }
            }

            switch (msg) {
                case "hello":
                    message.channel.send("hello");
                    break;
                default:
                    break;
            }
        }
    });
}
start();