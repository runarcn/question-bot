require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js')
const fs = require('fs');

// Loads intents. Consult documentation for more info: https://discord.com/developers/docs/topics/gateway#list-of-intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ],
});

// Writes to console if the bot is running
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
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

// Send QotW function
function sendMessage() {
    // Selects random trans question
    const randomTransIndex = Math.floor(Math.random() * transQuestion.length); 
    const randomTransQuestion = transQuestion[randomTransIndex].question;
    // Selects random general question
    const randomGeneralIndex = Math.floor(Math.random() * generalQuestion.length); 
    const randomGeneralQuestion = generalQuestion[randomGeneralIndex].question;
    // Sends message to preferred channel
    const channelId = process.env.CHANNEL_ID;
    const channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(`This weeks general question is: ${randomGeneralQuestion} \nThis weeks trans-related question is: ${randomTransQuestion}`);
    }
}

// Schedule QotW
function questionScheduler() {
    const dayInMS = 24 * 60 * 60 * 1000; // 24 hours
    const weekInMS = 7 * dayInMS; // 1 week
    // const fourSeconds = 4 * 1000 // Used for testing
    setInterval(sendMessage, weekInMS);
    // setInterval(sendMessage, fourSeconds); // Used for testing
}
 
// Commands
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Question of the Week-command
    if(interaction.commandName === 'qotw') {
        sendMessage();
        questionScheduler();
        interaction.reply("Bot initialized.");
    };

    // Add questions to database from Discord-command
    if(interaction.commandName === 'add') {
        const type = interaction.options.get('type').value;
        const question = interaction.options.get('question').value;
        
        if (type === 'generalQuestions') {
            database.generalQuestions.push({ question });
        } else if (type === 'transQuestions') {
            database.transQuestions.push({ question });
        };
        const updatedData = JSON.stringify(database);
        fs.writeFileSync('questions.json', updatedData, 'utf8');
        interaction.reply("Added `" + question + "` to the `" + type + "` database.")
    };
});

// Logs in with token from .env
client.login(process.env.TOKEN);

