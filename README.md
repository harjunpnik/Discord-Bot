# Discord-Bot

A simple Discordbot with Youtube-playback and other fun commands.

## Installation

Node JS is required to run this bot.
Some NPM packages are also needed for this bot to work. They can be installed by running the "npm_installs.bat" file or by writing the following commands in the root folder in powershell:    

```
npm init
npm install discord.js -save
npm install opusscript
npm install ytdl
```

The bot needs to be added to the server and the 
```javascript
bot.login('<Your Token goes here>')
```
needs to  be changed to the bots own token.
 
## Running the program

To start the bot you can run the "start.bat" file or  by writing the following command in the root folder in powershell:

```
node index
```
The bot will run until its command window is shut down, "ctrl + C" is pressed or when the bot encounters an error.

## Possible updates
Some possible updates or commands to be implemented:
* Que system for the Youtube-playback
* Skip song command
  * Vote skip 
  * Instant skip with certain server roles 
* Giphy-api implementation
* Purge functionality (Deletes messages)
