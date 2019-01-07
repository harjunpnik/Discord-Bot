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
npm install get-json
```
A new applicaton must be created over at [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me  "https://discordapp.com/developers/applications/me") and added to the server. From the same site you can access the bots token which needs to be replaced on the following line.

```javascript
const botToken = '<Your Token goes here>'; //Enter your own Bot Token here
```
By default, the bot has low privileges and needs to given extra privileges for certain commands to work properly. 

To use the Gif command requires a giphy api key which can be requested from
[here](https://giphy.api-docs.io/1.0/welcome/access-and-api-keys  "https://giphy.api-docs.io/1.0/welcome/access-and-api-keys"). Replace the next line with your own api key.

```javascript
const giphyApiKey = '<Your API-Key goes here>'   //Enter your own giphy-api key here
```

To use the purge command the botAdminRole needs to be changed. This is so that everyone cannot delete the whole chat history. It can be changed here.

```javascript
const botAdminRole = '<Your Discord bot admin role goes here>';
```

By default the bot will run with the prefix "-". This can be changed here.

```javascript
const prefix = '-';
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
| -gif          | Searches for the first result on the site Giphy                                		| -gif funny cat 									|
| -gifr         | Searches for a random gif on the site Giphy                                			| -gif batman	 									|			
| -genre        | Recommends a random music genre to listen to                         					| -genre         									|
| -help         | Shows all the commands                                               					| -help         						 			|
| -info         | Shows information about the bot                                      					| -info        										|
| -ping         | Bot replys Pong!                                                     					| -ping      									    |
| -play         | Plays a youtube videos audio                                         					| -play https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| -purge        | Deletes a given amount between 1-100 messages from chat to clean the chat             | -purge 20											|
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
  * ~~Random gif and first result gif~~ [Done]
* ~~Purge functionality (Deletes messages)~~ [Done]
