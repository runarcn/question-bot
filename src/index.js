require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js')
const fs = require('fs');

// Consult documentation for more info: https://discord.com/developers/docs/topics/gateway#list-of-intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ],
});

// Function to read questions from the database
function getQuestions() {
    const dbData = fs.readFileSync('questions.json');
    const database = JSON.parse(dbData);
    return database;
}

const database = getQuestions();
const transQuestion = database.transQuestions
const generalQuestion = database.generalQuestions

// Writes to console if the bot is running
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

// Commands
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // Question of the Week-command
    if(interaction.commandName === 'qotw') {
        // Selects random trans question
        const randomTransIndex = Math.floor(Math.random() * transQueston.length); 
        const randomTransQuestion = transQuestion[randomTransIndex].question;
        // Selects random general question
        const randomGeneralIndex = Math.floor(Math.random() * generalQuestion.length); 
        const randomGeneralQuestion = generalQuestion[randomGeneralIndex].question;
        // Replies
        interaction.reply(`This weeks general question is: ${randomGeneralQuestion} \nThis weeks trans-related question is: ${randomTransQuestion}`);
    }
});

// Logs in with token from .env
client.login(process.env.TOKEN);

