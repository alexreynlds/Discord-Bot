//Importing packages for both discordjs and dotenv from their node installs
import DiscordJS, {
    Client,
    Intents,
    Message,
    MessageAttachment,
} from "discord.js";
import dotenv from "dotenv";
var fs = import("fs");
import { readdir } from "fs/promises";
import { readdirSync } from "fs";

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
    const attachment = new MessageAttachment("https://i.imgur.com/XxxXxXX.jpg");
});

client.on("messageCreate", (message) => {
    if (message.content === "ping") {
        message.reply({
            content: `:ping_pong: Pong! :ping_pong: \n Latency:     ${
                Date.now() - message.createdTimestamp
            }ms \n API Latency: ${Math.round(client.ws.ping)}ms`,
        });
    }
    if (message.content.toLowerCase().includes("don")) {
        const dondir = "./images/dons";
        const length = readdirSync(dondir).length;

        const num = Math.floor(Math.random() * length);
        message.channel.send({ files: [`./images/dons/${num}.jpg`] });
    }
    if (message.content.toLowerCase().includes("8ball")) {
        const balldir = "./images/8ball";
        const length = readdirSync(balldir).length;

        const num = Math.floor(Math.random() * length);
        message.channel.send({ files: [`./images/8ball/${num}.gif`] });
    }
});

//Logging into the clien with the token within the env
client.login(process.env.TOKEN);
