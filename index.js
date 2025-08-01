import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";

import {
  getGemini,
  getGreeting,
  getWeather,
  respondToThank,
} from "./src/utils/index.js";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
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
  new SlashCommandBuilder()
    .setName("pense")
    .setDescription(
      "o bot consulta o Gemini conforme o prompt enviado pelo usuário"
    )
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Digite o contéudo a ser consultado na IA")
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

  getGreeting(message);

  respondToThank(message);
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tempo") {
    getWeather(interaction);
  }
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "pense") {
    getGemini(interaction);
  }
});

discordClient.on("guildMemberAdd", (member) => {
  const welcomeChannelId = process.env.DISCORD_CHANNEL_ID;
  const channel = member.guild.channels.cache.get(welcomeChannelId);

  if (channel && channel.isTextBased()) {
    setTimeout(() => {
      channel.send(`Seja muito bem-vindo ${member}! 🎈`);
    }, 5000);
  }
});
