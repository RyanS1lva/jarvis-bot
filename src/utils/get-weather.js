import axios from "axios";

export const getWeather = async (interaction) => {
  try {
    const city = interaction.options.getString("cidade");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    const data = response.data;

    const weather = data.weather[0].description;
    const temperature = data.main.temp;

    const weatherMessage = `No momento consta ${weather} em ${city},\ncom temperatura de ${temperature} °C`;

    await interaction.reply(weatherMessage);
  } catch (e) {
    console.log(e);
  }
};
