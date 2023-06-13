# Question of the Week-bot for the r/traa discord
Fully functional and self host-able discord bot to automate QotW for the r/traa discord, written in js with the discord.js library.

* See /src for all the relevant code
* The database used is questions.json

## How to initialize
The bot has currently only been tested on Linux, but it should work all the same on all other operative systems.

1. Make sure you've got nodemon installed - `sudo npm install -g nodemon`, or `npm install -g nodemon` for Windows users.
2. Add relevant tokens and IDs to your .env-file - this file should be stored in the same directory as package.json.
3. Head into the main directory and run `nodemon`. The bot should write `Question-bot#xxxx is online.`.
4. Write your questions to the database using /add
5. Run /qotw once.

| Command | Description |
| - | - |
| /qotw | Prints out two randomly selected questions, waits a week and does it again. Repeat |
| /add [trans,general], [question] | Writes [question] to the trans or general database based on user input |

## Currently known issues
* the `/add`-command doesn't give the user a reply and instead gives a warning that the application did not respond. The command is however fully functional.

## License
This bot is licensed under the GPL-license. See the LICENSE-file for more information on the GPL.
