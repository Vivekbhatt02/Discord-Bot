import {ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle} from 'discord.js';
import {createShortUrl, getVisitHistory, isValidHttpUrl} from "./services/urlService.js";
import {BASE_URL} from "./config.js";

const PREVIEW_SIZE = 5;

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

const analytics = {
    data: {
        name: 'analytics',
        description: 'Shows visit history/number of clicks'
    },
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const urlsData = await getVisitHistory(PREVIEW_SIZE);

            if (urlsData.length === 0) {
                return interaction.editReply("No short URLs created yet. Use /create to make one.");
            }

            const message = urlsData.map((data, index) => {
                return `${index + 1}. ${BASE_URL}/${data.shortId} - ${data.visits} ${data.visits === 1 ? "visit" : "visits"}`;
            }).join('\n');

            const viewAllButton = new ButtonBuilder()
                .setLabel("View all")
                .setStyle(ButtonStyle.Link)
                .setURL(`${BASE_URL}/analytics`);

            await interaction.editReply({
                content: `**Top ${urlsData.length} URLs**\n\n${message}`,
                components: [new ActionRowBuilder().addComponents(viewAllButton)]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong while fetching analytics");
        }
    }
};

const commands = [ping, create, analytics];

export const commandMap = new Map(commands.map(command => [command.data.name, command]));
export const commandData = commands.map(command => command.data);
