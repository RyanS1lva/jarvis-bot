import { Client, GatewayIntentBits } from "discord.js";
import { getGreeting } from "./src/utils/greetings.js";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

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
