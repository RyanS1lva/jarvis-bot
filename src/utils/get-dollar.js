import axios from "axios";

export const getDollar = async (interaction) => {
  try {
    const searchDate = getDate();
    const response = await axios.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${searchDate}'&$top=100&$format=json`
    );

    const data = response.data;

    const dolar = data.value[0].cotacaoVenda;

    const dateAndTime = data.value[0].dataHoraCotacao.toString();
    const date = dateAndTime.split(" ")[0];

    const formatDate = date.split("-");

    await interaction.reply(
      `${dolar.toFixed(2)} R$. (última atualização: ${formatDate[2]}/${
        formatDate[1]
      }/${formatDate[0]})`
    );
  } catch (e) {
    console.log(e);
    await interaction.reply("Agora não é um bom momento senhor.");
  }
};

const getDate = () => {
  const now = new Date();

  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  const dayWeek = now.getDay();

  if (dayWeek === 0) {
    day = day - 2;
  } else if (dayWeek === 6) {
    day = day - 1;
  }

  if (day <= 0) {
    month = month - 1;

    if (month <= 0) {
      month = 12;
      year = year - 1;
    }

    const monthDays = new Date(year, month, 0).getDate();

    day = monthDays;
  }

  day = zeroLeft(day);
  month = zeroLeft(month);

  const searchDate = `${month}-${day}-${year}`;

  return searchDate;
};

const zeroLeft = (number) => {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
};
