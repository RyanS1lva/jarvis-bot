import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { getGreeting } from "./src/utils/greetings.js";

import axios from "axios";

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
    const city = interaction.options.getString("cidade");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`
      );

      const data = response.data;

      const weather = data.weather[0].description;
      const temperature = data.main.temp;

      const weatherMessage = `No momento está ${weather} em ${city},
com temperatura de ${temperature} °C`;

      await interaction.reply(weatherMessage);
    } catch (e) {
      console.log(e);
    }
  }
});
