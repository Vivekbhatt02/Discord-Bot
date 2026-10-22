# Discord Bot - URL Shortener

A small Discord bot I made for practice. You give it a link with `/create` and it gives back a short URL. Opening the short URL redirects to the original link and saves the visit in MongoDB.

The bot and a small Express server run together in one Node process.

## Commands

- `/create link:<url>` - creates a short URL
- `/ping` - replies with Pong

The bot also replies with a greeting when someone sends a normal message.

## Tech used

- discord.js
- Express
- MongoDB with Mongoose
- nanoid for the short ids

## Setup

1. Clone the repo and install packages

   ```
   git clone https://github.com/Vivekbhatt02/Discord-Bot.git
   cd Discord-Bot
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values

   ```
   cp .env.example .env
   ```

   - `DISCORD_TOKEN` and `CLIENT_ID` come from the Discord Developer Portal
   - `MONGODB_URI` is your MongoDB connection string
   - `BOT_USER_ID` is the `_id` of a user document for the bot in the `users` collection

3. In the Developer Portal, turn on **Message Content Intent** (Bot tab), since the bot reads messages for the greeting.

4. Register the slash commands (only needed once, or when commands change)

   ```
   npm run commands
   ```

5. Start the bot

   ```
   npm start
   ```

## Note

Short links use `BASE_URL`, which is `http://localhost:8000` by default, so they only open on your own machine.

## Project structure

```
index.js            bot setup and event handlers
slashCommands.js    /ping and /create
command.js          registers slash commands with Discord
server.js           Express server for redirects
services/           url helper functions
models/             mongoose model
config.js           reads env variables
connection.js       mongodb connection
```
