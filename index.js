//Importing packages for both discordjs and dotenv from their node installs
import DiscordJS, { Client, Intents, Message } from "discord.js";
import dotenv from "dotenv";

//Allows for accesses to whats stored in the dotenv file
dotenv.config();

//Create a new instance of a discord client
const client = new DiscordJS.Client({
    //In discordjs 13 you must state the bots intentions
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

//When the bot is ready it will console log it
client.on("ready", () => {
    console.log("The bot is ready");
});

client.on("messageCreate", (message) => {
    if (message.content === "ping") {
        message.reply({
            content: `:ping_pong: Pong! :ping_pong: \n Latency:     ${
                Date.now() - message.createdTimestamp
            }ms \n API Latency: ${Math.round(client.ws.ping)}ms`,
        });
    }
});

//Logging into the clien with the token within the env
client.login(process.env.TOKEN);
