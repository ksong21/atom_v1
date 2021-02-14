const {Client} = require("discord.js");
const client = new Client();
const prefix = "$";

module.exports = client.on("message", (message) => {
    if (!message.author.bot) {
        console.log(message.author.tag + " said " + message.content);
        const msg = message.content;

        if (msg.startsWith(prefix)) {
            const commandName = msg.trim().split(" ")[0].substring(prefix.length);

            if (commandName == "help") {
                message.channel.send("Commands:"
                + "\n$help - Lists commands"
                + "\n$roll - Rolls a number from 1 to 6"
                + "\n$cancer - Idk"
                + "\n\nIn development:"
                + "\n$play [YouTube URL] - Joins user voice channel and plays video as audio"
                + "\n$stop - Stops playing and leaves voice channel"
                );
            }
        }
    }
});