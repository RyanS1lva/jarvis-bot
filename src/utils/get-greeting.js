export const getGreeting = (message) => {
  const greetingKeywords = [
    "bom dia jarvis",
    "boa tarde jarvis",
    "boa noite jarvis",
  ];

  const content = message.content.toLowerCase();
  const userGreeting = content.replace(/[.,!]/g, "");

  if (!greetingKeywords.includes(userGreeting)) return;

  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    message.channel.send("Bom dia, senhor.");
  } else if (hour >= 12 && hour < 18) {
    message.channel.send("Boa tarde, senhor.");
  } else if (hour >= 18 && hour < 24) {
    message.channel.send("Boa noite, senhor.");
  } else {
    message.channel.send("Trabalhado até mais tarde novamente senhor?");
  }
};
