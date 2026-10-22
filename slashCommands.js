import {ApplicationCommandOptionType} from 'discord.js';
import {createShortUrl, isValidHttpUrl} from "./services/urlService.js";
import {BASE_URL} from "./config.js";

const ping = {
    data: {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    async execute(interaction) {
        await interaction.reply("Pong!!");
    }
};

const create = {
    data: {
        name: 'create',
        description: 'Creates a new short ID',
        options: [
            {
                name: 'link',
                description: 'URL to shorten',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    async execute(interaction) {
        const url = interaction.options.getString('link').trim();

        if (!isValidHttpUrl(url)) {
            return interaction.reply({
                content: "Please enter a valid URL",
            });
        }

        await interaction.deferReply();

        try {
            const shortId = await createShortUrl(url);
            await interaction.editReply(`Short URL: ${BASE_URL}/${shortId}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong while creating the short ID");
        }
    }
};

const commands = [ping, create];

export const commandMap = new Map(commands.map(command => [command.data.name, command]));
export const commandData = commands.map(command => command.data);
