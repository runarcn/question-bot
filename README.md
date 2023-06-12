# Question of the Week discord bot for the r/traa discord
This bot is still in development, however it is currently fully functional if you only want two random questions each time the /qotw command is called.

* See /src for all the relevant code
* The database used is questions.json


## How to use
1. Make sure you've got nodemon installed - `sudo npm install -g nodemon`
2. Add relevant tokens and IDs to your .env-file - this file should be stored in the same directory as package.json.
3. Head into the main directory and run `nodemon`. The bot should write `Question-bot#xxxx is online.`.
