require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'qotw',
        description: 'Outputs the weeks question',
    },
];

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