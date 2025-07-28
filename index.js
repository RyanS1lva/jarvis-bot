import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";

import { getGreeting, getWeather } from "./src/utils/index.js";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = [
  new SlashCommandBuilder()
    .setName("tempo")
    .setDescription("O bot informa qual a situação climática atual")
    .addStringOption((option) =>
      option
        .setName("cidade")
        .setDescription("Digite o nome da cidade")
        .setRequired(true)
    ),
].map((cmd) => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
      body: commands,
    });
    console.log("Comandos registrados!");
  } catch (error) {
    console.error(error);
  }
})();

discordClient.login(process.env.DISCORD_TOKEN);

discordClient.on("ready", () => {
  console.log(`Bot online, como ${discordClient.user.tag}`);
});

discordClient.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const greeting = getGreeting(message);

  if (greeting) {
    message.channel.send(greeting);
  }
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tempo") {
    getWeather(interaction);
  }
});
