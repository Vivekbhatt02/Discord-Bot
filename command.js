import {REST, Routes} from 'discord.js';
import {CLIENT_ID, DISCORD_TOKEN} from "./config.js";
import {commandData} from "./slashCommands.js";

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandData });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
