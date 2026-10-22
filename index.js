import {Client, Events, GatewayIntentBits} from 'discord.js';
import connectToMongoDB from "./connection.js";
import {DISCORD_TOKEN, MONGODB_URI} from "./config.js";
import {commandMap} from "./slashCommands.js";
import {startServer} from "./server.js";

try {
    await connectToMongoDB(MONGODB_URI);
    console.log("MongoDB Connected");
} catch (err) {
    console.error("Error Occurred while connection to DB", err);
    process.exit(1);
}

startServer();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) {
        return;
    }

    try {
        await message.reply(`Hi ${message.author.displayName}, welcome! Use /create to shorten a URL.`);
    } catch (error) {
        console.error("Failed to send greeting", error);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    try {
        await commandMap.get(interaction.commandName)?.execute(interaction);
    } catch (error) {
        console.error(`Error running /${interaction.commandName}`, error);
    }
});

client.login(DISCORD_TOKEN);
