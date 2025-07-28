import axios from "axios";

export const getWeather = async (interaction) => {
  try {
    const city = interaction.options.getString("cidade");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    const data = response.data;
    console.log(data);
    const weather = data.weather[0].description;
    const temperature = data.main.temp;

    let advice = "";

    if (temperature < 10) {
      advice =
        "Está frio lá fora 🥶, recomendo que não saia de casa sem estar bem agasalhado ❄️🧣";
    } else if (temperature >= 10 && temperature < 18) {
      advice =
        "Está fresquinho lá fora 🍃, recomendo que leve um casaquinho se for sair 🧥";
    } else if (temperature >= 18 && temperature < 24) {
      advice = "Temperatura agradável! pode colocar uma manga curta 😎";
    } else {
      advice =
        "Ta calorzinho 🥵! considere usar roupas de tecido leve e manga curta";
    }

    const weatherMessage = `No momento consta ${weather} em ${city}, com temperatura de ${temperature} °C.\n${advice}`;

    await interaction.reply(weatherMessage);
  } catch (e) {
    console.log(e);
  }
};
