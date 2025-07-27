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
    if (userGreeting == greetingKeywords[0]) {
      return "Bom dia, senhor.";
    }
  }

  if (hour >= 12 && hour < 18) {
    if (userGreeting == greetingKeywords[1]) {
      return "Boa tarde, senhor.";
    }
  }

  if (hour >= 18 && hour < 24) {
    if (userGreeting == greetingKeywords[2]) {
      return "Boa noite, senhor.";
    }
  }

  if (hour >= 24 && hour < 6) {
    return "Madrugando novamente senhor?";
  }
};
