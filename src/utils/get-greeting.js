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
    return "Bom dia, senhor.";
  } else if (hour >= 12 && hour < 18) {
    return "Boa tarde, senhor.";
  } else if (hour >= 18 && hour < 24) {
    return "Boa noite, senhor.";
  }

  return "Trabalhado até mais tarde novamente senhor?";
};
