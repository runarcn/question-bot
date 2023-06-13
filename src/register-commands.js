require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [{
        name: 'qotw',
        description: 'Outputs the weeks question',
    }, {
        name: 'add',
        description: 'Adds a question to the database.',
        options: [
            {
                name: 'type',
                description: 'Choose between general and trans question.',
                type: ApplicationCommandOptionType.String,
                choices: [{
                    name: 'trans',
                    value: 'transQuestions',
                }, {
                    name: 'general',
                    value: 'generalQuestions',
                }],
                required: true,
            }, {
                name: 'question',
                description: 'The question to add',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Resgistering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
            { body: commands }
        );
        console.log('Slash commands registered successfully.');
    
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }

})();