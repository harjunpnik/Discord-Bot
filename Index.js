//Loads libraries: discord.js, youtube download core and getJSON
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const getJSON = require('get-json');

//API-Keys and Bot Token
const botToken = process.env.Bot_Token; //Enter your own Bot Token here
const giphyApiKey =  process.env.Giphy_Api_Key;//Enter your own giphy-api key here

//Bot admin role from the server 
const botAdminRole = process.env.Bot_Admin_Role;

//Prefix to messages so the bot will understand to execute the code.
const prefix = '-';

//Sets your client, named to : bot.
const bot = new Discord.Client();

//Variable for checking if the bot is ready to play music and youtube que
var isReady = true;
var youtubeQue = [];

//Variables for csgo lobby system
var lobbyPlayers = [];
var lobbyActive = false;

//Bot does this on start-up.
bot.on('ready', () => {
    //on successfull startup it writes in the console log 'I am ready!'.
    console.log('I am ready!');
    //user.setGame(""); Sets the game what bot is playing. Can be used to display usefull messages.
    bot.user.setActivity("My prefix is: " + prefix);
});


//This will run each time a messages is written to the chat.
bot.on('message', message => {

    //Creating variableslet 
    let url = message.content;                                  //Variable that stores the message so that the url can be used to play music.
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
        const embed = new Discord.RichEmbed()
                        .setAuthor(bot.user.username + " commands", bot.user.displayAvatarURL)
                        .setThumbnail(bot.user.displayAvatarURL)
                        .setTitle("COMMANDS:")
                        .addField(prefix + "cat","Posts a random cat picture from random.cat.")
                        .addField(prefix + "csgo","Starts a csgo lobby.")
                        .addField(prefix + "fail","Plays a fail trumpet sound.")
                        .addField(prefix + "gif \[search terms\]","Searches for the first result on the site Giphy. \n Example: " + prefix + "gif funny cat")
                        .addField(prefix + "gifr \[search terms\]","Searches for a random gif on the site Giphy. \n Example: " + prefix + "gifr batman")
                        .addField(prefix + "genre","Recommends a random music genre to listen to.")
                        .addField(prefix + "help","Shows all the commands.")
                        .addField(prefix + "info","Shows information about the bot")
                        .addField(prefix + "join","Let's player join the CS GO lobby")
                        .addField(prefix + "ping","Bot replys Pong!")
                        .addField(prefix + "play \[link\]","Plays a youtube videos audio. \n Example: " + prefix + "play https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                        .addField(prefix + "purge \[number\]","Deletes a given amount between 1-100 messages from chat to clean the chat. \n Example: " + prefix + "purge 20")
                        .addField(prefix + "resetlobby","Resets the CS GO lobby.")
                        .addField(prefix + "roll","Rolls a number between 1 and 100.")
                        .addField(prefix + "skip","Skips the current song from playing")
                        .addField(prefix + "stop","Stops the audio from playing")
                        .addField(prefix + "8ball \[Question\]","Ask the magical 8ball a question and your question shall be answered. \n Example: " + prefix + "8ball Is the Earth flat?")
                        .addField("For more information and updates:","https://github.com/harjunpnik/Discord-Bot")
                        .setFooter("Author: Niklas | https://github.com/harjunpnik/Discord-Bot");
    
            message.channel.send({embed});
    }

    //--------CAT-------------
    if (msg === prefix + 'CAT') {
        //Posts a random cat picture from random.cat.
        var catApiUrl = "http://aws.random.cat/meow"             

        getJSON(catApiUrl, function(error, response){      //Get JSON data from url
            //console.log(error);
            //console.log(response);
            message.channel.send(response.file);            //Sends url to chat
        });
    }

    //--------FAIL------------
    //This command will activate if bot isReady to play music
    if (isReady && msg === prefix + 'FAIL') {
        //Bot joins a channel to play a fail trumpet sound.
        
        //This checks if the sender of the message is not a voicechat.
        if(!message.member.voiceChannel){
            message.reply('You need to be in a voicechat.');  //Remind user that they need to be in a voicechat to use this command.
            return;
        }
        
        message.channel.send("Playing: Fail trumpet");  //Sends message what bot is playing.
        isReady = false;                                //Sets bots variable to false so that no other music commmand can be played at the same time. 
        var voiceChannel = message.member.voiceChannel; //Saves what voice channel to join.
        voiceChannel.join().then(connection =>{         //Joins voice channel and then:
            const dispatcher = connection.playFile('./sound/fail.mp3'); //Plays sound file from folder.
            dispatcher.on("end", end => {               //When Music ends it executes following:
                voiceChannel.leave();                   //Leaves the voice channel and
                isReady = true;                         //sets isReady to True.
            });
        }).catch(err => console.log(err));              //consolelogs errors.
    }

    //--------GIF & GIFR (GIPHY)-----------
    //The function for the two giphy commands
    function giphySearch(isRandom) {
        var fullApiKey = "&api_key=" + giphyApiKey;
        var api = "http://api.giphy.com/v1/gifs/search?q=";
        var searchReply;            //variable for the reply
        var searchTerm = "";        //variable for the search terms
        var contents = cont;        //array including every word from the message, including the command word

        if(contents.length <= 1){   //checks if the message contains a search word
            searchReply = "You need to enter search terms after -gif. Example: " + prefix + "gif funny cat";
            message.channel.send(searchReply);
        }else{                      //if there are search terms this part is run
            for(i = 0; i < contents.length -1 ; i++){   //for loop that outputs the search tearms so that giphy api can handle it
                if(i <contents.length -2 ){
                    searchTerm += contents[i+1] + "+";
                }else{
                    searchTerm += contents[i+1];
                }
            }
            http://api.giphy.com/v1/gifs/search?q=batman+funny+cat?&api_key=dc6zaTOxFJmzC
            var apiUrl = api + searchTerm + fullApiKey;         //Giphy api url is combined here
          
            searchReply = "Search did not work";
            getJSON(apiUrl, function(error, response){      //Get JSON data from url
                //console.log(error);
                //console.log(response.data.length);
                //console.log(isRandom);

                if (isRandom){
                    var result = Math.floor(Math.random() * response.data.length);  
                    searchReply = response.data[result].url;         //Sends url from first result
                }else{
                    searchReply = response.data[0].url;         //Sends url from first result
                }              
                
                message.channel.send(searchReply);          //Sends url to chat
            });
        
        }  
    }

    //--------GIF (GIPHY)-----------
    if (msg.startsWith(prefix + 'GIF') && msg.substring(4,5) != "R" ){
        //Posts the first match found on giphy 
        giphySearch(false);
    }
    

    //--------GIFR (GIPHY)-----------
    if (msg.startsWith(prefix + 'GIFR')){
        //Posts a random match found on giphy 
        giphySearch(true);
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
        //Makes bot send info embed to show bot name, version, update date, creation date, author and github link.
        const embed = new Discord.RichEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
                    .setThumbnail(bot.user.displayAvatarURL)
                    .addField("Bot Name:", bot.user.username)
                    .addField("Version:","1.6.0")
                    .addField("Updated:","6.4.2019")
                    .addField("Created:","18.12.2018")
                    .addField("Author:","Niklas")
                    .addField("Github page:","https://github.com/harjunpnik/Discord-Bot");

        message.channel.send({embed});
    }

    //--------MAGIC 8 BALL----
    if (msg.substring(0,6) === prefix + '8BALL' && msg.length >= 7){
        //Magic 8 ball will anwser randomly your question.
        //Creating variables and response array.
        var response = ["It is certain", "As I see it, yes", "Reply hazy try again", "Don't count on it", "It is decidedly so", "Most likely", "Ask again later", "My reply is no", "Without a doubt", "Outlook good" ," Better not tell you now", "My sources say no", "Yes definitely", "Yes", "Cannot predict now", "Outlook not so good", "You may rely on it" ," Signs point to yes" , "Concentrate and ask again", "Very doubtful"];
        var ballNumber = Math.floor((Math.random() * response.length)); //Calculating random number based on array size.
        message.reply(response[ballNumber]);//Posts the response 
         
    }
    //If input has no question, give user feedback on how to use command
    else if(msg.substring(0,6) === prefix + '8BALL' && msg.length <= 7){
        message.reply("You didn't ask a question, please try again with the format \n" + prefix + "8ball \[Your question\]") //Remind user how to use command
    }
    
     //-------PING------------
    if (msg === prefix + 'PING') {
        //Simple commmand that will post a message back, "Pong!" in this case.
        message.channel.send('Pong!');
    }

    //--------PLAY------------
    function play (connection){
        const dispatcher = connection.playStream(YTDL(youtubeQue[0], {filter: "audioonly"}));   //Plays sound from youtube video
        message.channel.send("Playing: " + youtubeQue[0] );                                     //Sends message to channel informing what is playing
        youtubeQue.shift();
        
        dispatcher.on("end", end => {               //When Music and there are still songs in que,
                if(youtubeQue[0]){                  //execute play again
                    play(connection);
                }else{
                    voiceChannel.leave();                   //Leaves the voice channel
                    isReady = true;                         //sets isReady to True.
                }                   
        });
    }

    //--------PLAY------------
    //This command will play music in a voicechat
    if ( msg.startsWith(prefix + 'PLAY')) {
        //Bot joins a channel to play the youtube url sound.
        
        //This checks if the sender of the message is not a chat.
        if(!message.member.voiceChannel){
            message.reply('You need to be in a chat.');  //Remind user that they need to be in a voicechat to use this command.
            return;
        }
        
        var video;                                          //Creates variable video.
        video = url.substring(5, msg.length+1);             //Cuts the message so that the url is left.
        youtubeQue.push(video);                             //adds song to que
        //console.log(youtubeQue);
        if (isReady){
            isReady = false;                                //Sets bots variable to false so that no other music commmand can be played at the same time. 
            var voiceChannel = message.member.voiceChannel; //Saves what voice channel to join.
            voiceChannel.join().then(connection =>{         //Joins voice channel and executes play function
                play(connection);
            }).catch(err => console.log(err));              //consolelogs errors.
        }    
    }
    
    //-------PURGE------------
    //Purge function
    async function purge() {
        message.delete(); //deletes the sent command
        var amount = parseInt(cont[1]); //Takes the amount from the message
        //We want to check if the user has the right role to use this command.
        if (!message.member.roles.find("name", botAdminRole)) { //This checks to see if they don't have the role.
        message.reply('You do not have the premission to use this command.');    //Reminds user that they don't have premission for that.
            return; 
        }

        // We want to check if the argument is a number
        if (isNaN(amount)) {
            message.reply('Please use a number as your argument. \nUsage: ' + prefix + 'purge <number>'); // Remind user how to use command.
            return;
        }

        // We want to check that the argument is between 0 and 100
        if (amount > 100 || amount <= 0) {
            message.reply('Please use a number between 1 - 100. \nUsage: ' + prefix + 'purge <number>'); // Remind user how to use command.
            return;
        }

        //Fetch the messages that are to be deleted
        const fetched = await message.channel.fetchMessages({limit: amount + 1});
        //console.log(fetched.size + ' messages found'); 

        //Deletes the messages
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`)); 
    }    

     //-------PURGE------------
     if (msg.startsWith(prefix + 'PURGE')) { 
        //Deletes a defined amount of messages from chat to clean the chat.
        purge();
    }
    
    //--------ROLL------------
    if (msg === prefix + 'ROLL'){
        //Rolls a random number between 1 and 100
        message.reply(Math.floor((Math.random() * 100) + 1));
    }
    
    //--------SKIP------------
    if (msg === prefix + 'SKIP'){
        //This checks if the sender of the message is not a chat.
        if(!message.member.voiceChannel){
            message.reply('You need to be in a chat.');   //Remind user that they need to be in a voicechat to use this command.
            return;
        }
        if(isReady){
            message.reply('There is nothing to skip');   //Remind user that they cannot skip 
            return;
        }
        //console.log(youtubeQue);
        var voiceChannel = message.member.voiceChannel;   //Saves what voice channel
        voiceChannel.connection.dispatcher.end();         //Ends the currently playing song

    }

    //--------STOP------------
    if (!isReady && msg === prefix + 'STOP') {
        //Makes bot stop the music.
        
        //Makes bot rejoin without music and ends instantly making the bot leave.
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection =>{
            const dispatcher = connection.playFile('');
            dispatcher.on("end", end => {
                voiceChannel.leave();
                youtubeQue = [];        //Clears the youtube que
                isReady = true;
            });
        }).catch(err => console.log(err));
    }

    //Function for csgo lobby
    function csgoLobbyStatus(){
        const embed = new Discord.RichEmbed()
        .setTitle("CS GO LOBBY:")
        .addField("Player 1", lobbyPlayers[0])
        .addField("Player 2", lobbyPlayers[1])
        .addField("Player 3", lobbyPlayers[2])
        .addField("Player 4", lobbyPlayers[3])
        .addField("Player 5", lobbyPlayers[4])
        
        message.channel.send({embed});
    }

    //--------CSGO------------
    if (msg === prefix + 'CSGO'){
        // Test for cs go lobby join
        if(!lobbyActive){
            var playerNumber = lobbyPlayers.length +1;
            //message.channel.send("<@&560883579786100746> Player " + playerNumber + " - " + message.author.username + " joined the lobby");
            lobbyPlayers.push(message.author.username);
        }

        csgoLobbyStatus();

        lobbyActive = true;
    }

    //--------JOIN CSGO------------
    if (msg === prefix + 'JOIN'){
        // Test for cs go lobby join

        //Checks if player is already in the lobby
        if(!lobbyActive){
            message.channel.send("No lobby is active. You can create a lobby by writing " + prefix + "csgo to create a lobby.");

        }else if(lobbyPlayers.indexOf(message.author.username) != -1){
            message.channel.send("You are already in the lobby");
            
        }else if(lobbyPlayers.length == 4){
            var playerNumber = lobbyPlayers.length +1;
            message.channel.send("Player " + playerNumber + " - " + message.author.username + " joined the lobby");
            lobbyPlayers.push(message.author.username);

            message.channel.send("Lobby Closed");

            csgoLobbyStatus();
            
            lobbyActive = false;
            lobbyPlayers = [];
            

        }else if(lobbyPlayers.length < 5){
            var playerNumber = lobbyPlayers.length +1;
            message.channel.send("Player " + playerNumber + " - " + message.author.username + " joined the lobby");
            lobbyPlayers.push(message.author.username);
            
        }

    }

    //--------CSGO LOBBY CLEAR------------
    if (msg === prefix + 'RESETLOBBY'){
        lobbyPlayers = [];
        lobbyActive = false;
        message.channel.send("Lobby has been cleared. Write " + prefix + "csgo to start a lobby");
    }

});





//Your bot token for the bot so that it can connect to the server.
bot.login(botToken);