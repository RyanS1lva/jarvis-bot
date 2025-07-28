export const respondToThank = (message) => {
  const content = message.content.toLowerCase();
  const userMessage = content.replace(/[.,!]/g, "");

  if (userMessage === "obrigado jarvis") {
    message.channel.send("Ao seu dispor senhor!");
  }
};
