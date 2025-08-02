# 🤖 J.A.R.V.I.S Bot

J.A.R.V.I.S é um bot para Discord inspirado no assistente da Marvel, projetado para ser um companheiro útil no servidor. Ele oferece comandos como saudações automáticas, respostas utilizando inteligência artitificial, informações sobre o clima e outras funções para tornar sua comunidade mais interativa e funcional.

## 📌 Funcionalidades

- 👋 Saudações automáticas para novos membros  
- 🌤️ Consulta de clima em tempo real (OpenWeatherMap API)  
- 🤖 Responde perguntas utilizando inteligência artificial (Gemini API)
- 💸 Retorna a última cotação disponível do dólar em reais (Banco Central do Brasil API)
- 🕹️ Comandos customizáveis com Slash Commands (`/`)  

---

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [discord.js v14](https://discord.js.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/RyanS1lva/jarvis-bot.git
```

### 2. Acesse o diretório do projeto e instale as dependências

```bash
cd jarvis-bot
npm install
```

### 3. Crie um arquivo `.env`

Baseie-se no `.env.example` presente no projeto e crie um arquivo `.env` com o seguinte conteúdo:

```env
DISCORD_TOKEN=DISCORD_TOKEN
DISCORD_CHANNEL_ID=DISCORD_CHANNEL_ID
APPLICATION_ID=APPLICATION_ID
WEATHER_API_KEY=WEATHER_API_KEY
GEMINI_API_KEY=GEMINI_API_KEY
```

### 4. Inicie a aplicação

```bash
npm start
```

### 5. Configure o seu bot

Acesse: https://discord.com/developers e configure o seu bot com permissões de chat e membros.




