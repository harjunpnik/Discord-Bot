//Loads libraries: discord.js 
const Discord = require('discord.js');

//Sets your client, named to : bot.
const bot = new Discord.Client();

//Prefix to messages so the bot will understand to execute the code.
const prefix = '-';

//Bot does this on start-up.
bot.on('ready', () => {
    //on successfull startup it writes in the console log 'I am ready!'.
    console.log('I am ready!');
    //user.setGame(""); Sets the game what bot is playing. Can be used to display usefull messages.
    bot.user.setActivity("My prefix is: -");
});


//This will run each time a messages is written to the chat.
bot.on('message', message => {

    //Creating variables
    let msg = message.content.toUpperCase();                    // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces.

    //This function checks if the sender of the message is the bot, it returns so that the bot won't loop with itself.
    if(message.author.bot) return;
    
    //This function checks if the message has a prefix in the beginning, if not it returns.*-
    if(message.content.indexOf(prefix) !== 0) return;
    

    //--------COMMANDS--------
    
    //--------HELP------------
    if(msg === prefix + 'HELP'){
        //Makes bot send help message to show users the commands.
        message.channel.send(
                        "Here is a list of my commands: \n" + 
                        "-cat    ---- Posts a random cat picture from random.cat. \n"  +
                        "-genre    ---- Recommends a random music genre to listen to. \n" +
                        "-help    ---- Shows all the commands. \n" +
                        "-info    ---- Information of bot. \n" +
                        "-ping    ---- Bot replys Pong! \n" +
                        "-roll    ---- Rolls a number between 1 and 100. \n" 
                        );
    }
    
    //--------CAT-------------
    if (msg === prefix + 'CAT') {
        //Posts a random cat picture from random.cat.                   //This number has to be changed by hand until a solution is done
        var picNumber = Math.floor((Math.random() * 1678));             //Generates a random number based on how many cat pictures (0-1677) -> Math.random() * 1678). 
        message.channel.send('http://random.cat/view?i='+ picNumber);   //Sends message with the url + picture number that generates the full url.
    }
    
    //--------GENRE-----------
    if (msg === prefix + 'GENRE'){
        //Posts a random genre recommendation.
        
        //Creating random number variable and genre array
        var genre = ["Blues", "Classical", "Country", "Folk", "Jazz", "Newage", "Reggae", "Rock"];
        //Calculating random number based on array size.
        var genreNumber = Math.floor((Math.random() * genre.length));
        //Posts the genre recommendation.
        message.reply(genre[genreNumber]);  
    }

    //--------INFO------------
    if (msg === prefix + 'INFO') {
        //Makes bot send info message to show author, version, creation date and last updated date.
        message.channel.send("Author of bot: Nickster \n" +
                                    "Version: 0.6.1 \n" +
                                    "Created: 18.12.2018 \n" +
                                    "Updated: 20.12.2018");
    }
    
     //-------PING------------
    if (msg === prefix + 'PING') {
        //Simple commmand that will post a message back, "Pong!" in this case.
        message.channel.send('Pong!');
    }
    
    //--------ROLL------------
    if (msg === prefix + 'ROLL'){
        //Rolls a random number between 1 and 100
        message.reply(Math.floor((Math.random() * 100) + 1));
    }
    
});

//Your bot token for the bot so that it can connect to the server.
bot.login('<Your Token goes here>');
