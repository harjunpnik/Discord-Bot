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

To use the Gif command requires a giphy api key which can be requested from
[here](https://giphy.api-docs.io/1.0/welcome/access-and-api-keys  "https://giphy.api-docs.io/1.0/welcome/access-and-api-keys"). Replace the next line with your own api key.

```javascript
var apiKey = "<Your Token goes here>"   //Enter your own giphy-api key here
```
 
## Running the program

To start the bot you can run the "start.bat" file or  by writing the following command in the root folder in powershell:

```
node index
```
The bot will run until its command window is shut down, "ctrl + C" is pressed or when the bot encounters an error.

## Bot Commands

The easiest way to find all the commands is tu use the ```-help``` command. This command prints out all the commands the bot is capable of.

The following list includes the commands that have been implemented.

| Command       | Description                                                          					| Example        									|
| ------------- |:-------------------------------------------------------------------------------------:|---------------------------------------------------|
| -cat          | Posts a random cat picture from [random.cat](http://random.cat  "http://random.cat")	| -cat           									|
| -fail         | Plays a fail trumpet sound                                           					| -fail          									|
| -gif          | Searches for a gif on the site Giphy                                 					| -gif funny cat 									|		
| -genre        | Recommends a random music genre to listen to                         					| -genre         									|
| -help         | Shows all the commands                                               					| -help         						 			|
| -info         | Shows information about the bot                                      					| -info        										|
| -ping         | Bot replys Pong!                                                     					| -ping      									    |
| -play         | Plays a youtube videos audio                                         					| -play https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| -roll         | Rolls a number between 1 and 100                                     					| -roll          									|
| -stop         | Stops the audio from playing                                         					| -stop          									|
| -8ball        | Ask the magical 8ball a question and your question shall be answered 					| -8ball Am I awesome?								|

## Possible updates
Some possible updates or commands to be implemented:
* Que system for the Youtube-playback
* Skip song command
  * Vote skip 
  * Instant skip with certain server roles 
* ~~Giphy-api implementation~~ [Done]
  * Random gif and first result gif
* Purge functionality (Deletes messages)
