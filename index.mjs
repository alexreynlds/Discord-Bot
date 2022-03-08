//Importing packages for both discordjs and dotenv from their node installs
import DiscordJS, {
    Client,
    Intents,
    Message,
    MessageAttachment,
    MessageEmbed,
} from "discord.js";
import {
    AudioPlayerStatus,
    AudioResource,
    entersState,
    joinVoiceChannel,
    VoiceConnectionStatus,
    createAudioPlayer,
    createAudioResource,
} from "@discordjs/voice";
import dotenv from "dotenv";
var fs = import("fs");
import { readdir } from "fs/promises";
import { readdirSync } from "fs";
import { channel } from "diagnostics_channel";

//Allows for accesses to whats stored in the dotenv file
dotenv.config();

const player = createAudioPlayer();
//Create a new instance of a discord client
const client = new DiscordJS.Client({
    //In discordjs 13 you must state the bots intentions
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
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
        const dondir = "./content/images/dons";
        const length = readdirSync(dondir).length;

        const num = Math.floor(Math.random() * length);
        message.channel.send({ files: [`./content/images/dons/${num}.jpg`] });
    }
    if (message.content.toLowerCase().includes("8ball")) {
        const balldir = "./images/8ball";
        const length = readdirSync(balldir).length;

        const num = Math.floor(Math.random() * length);
        message.channel.send({ files: [`./content/images/8ball/${num}.gif`] });
    }
    //Doesn't work! come back to later!
    if (message.content.toLowerCase() == "cinv") {
        let channel = message.channel;
        let invite = channel.createInvite({ unique: true });
        message.reply(`Invite code: ${invite.code}`);
    }
    if (message.content.toLowerCase() == "joinvc") {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
    }
    if (message.content.toLowerCase() == "playvc") {
        const resource = createAudioResource(`./content/audio/urmom.mp3`);
        player.play(resource);

        player.on("error", (error) => {
            console.error(error);
        });
    }
});

//Logging into the clien with the token within the env
client.login(process.env.TOKEN);
