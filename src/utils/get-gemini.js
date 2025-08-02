import { GoogleGenAI } from "@google/genai";

export const getGemini = async (interaction) => {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  await interaction.deferReply();

  const prompt = interaction.options.getString("prompt");

  if (!prompt) {
    await interaction.editReply("Por favor, forneça uma dúvida senhor.");
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Atue como o J.A.R.V.I.S da Marvel, limite-se a 1000 caracteres, 
      não faça sugestões após responder a pergunta, 
      considerando estas exigências responda seguinte mensagem do usuário: 
      Jarvis, ${prompt}`,
    });

    const geminiResponse = response.text;

    await interaction.editReply(geminiResponse);
  } catch (e) {
    console.log(e);

    await interaction.editReply("Desculpa, não consigo pensar agora senhor!");
  }
};
