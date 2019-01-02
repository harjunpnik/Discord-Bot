//Loads libraries: discord.js, youtube download core and getJSON
const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const getJSON = require('get-json')


//API KEYS 
const giphyApiKey = '<Your API-Key goes here>'   //Enter your own giphy-api key here

//Sets your client, named to : bot.
const bot = new Discord.Client();

//Variable for checking if the bot is ready to play music.
var isReady = true;

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

    //Creating variableslet 
    let url = message.content;                                      //Variable that stores the message so that the url can be used to play music.
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
                        .addField("-cat","Posts a random cat picture from random.cat.")
                        .addField("-fail","Plays a fail trumpet sound.")
                        .addField("-gif \[search terms\]","Searches for the first result on the site Giphy. \n Example: -gif funny cat")
                        .addField("-gifr \[search terms\]","Searches for a random gif on the site Giphy. \n Example: -gifr batman")
                        .addField("-genre","Recommends a random music genre to listen to.")
                        .addField("-help","Shows all the commands.")
                        .addField("-info","Shows information about the bot")
                        .addField("-ping","Bot replys Pong!")
                        .addField("-play \[link\]","Plays a youtube videos audio. \n Example: -play https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                        .addField("-roll","Rolls a number between 1 and 100.")
                        .addField("-stop","Stops the audio from playing")
                        .addField("-8ball \[Question\]","Ask the magical 8ball a question and your question shall be answered. \n Example: -8ball Is the Earth flat?")
                        .addField("For more information and updates:","https://github.com/harjunpnik/Discord-Bot")
                        .setFooter("Author: Niklas | https://github.com/harjunpnik/Discord-Bot");
    
            message.channel.send({embed});
    }
    
    //--------CAT-------------
    if (msg === prefix + 'CAT') {
        //Posts a random cat picture from random.cat.                   //This number has to be changed by hand until a solution is done
        var picNumber = Math.floor((Math.random() * 1678));             //Generates a random number based on how many cat pictures (0-1677) -> Math.random() * 1678). 
        message.channel.send('http://random.cat/view?i='+ picNumber);   //Sends message with the url + picture number that generates the full url.
    }

    //--------FAIL------------
    //This command will activate if bot isReady to play music
    if (isReady && msg === prefix + 'FAIL') {
        //Bot joins a channel to play a fail trumpet sound.
        
        //This checks if the sender of the message is not a voicechat.
        if(!message.member.voiceChannel){
            message.channel.send('You need to be in a voicechat.');  //Remind user that they need to be in a voicechat to use this command.
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
            searchReply = "You need to enter search terms after -gif. Example: -gif funny cat";
            message.channel.send(searchReply);
        }else{                      //if there are search terms this part is run
            for(i = 0; i < contents.length -1 ; i++){   //for loop that outputs the search tearms so that giphy api can handle it
                if(i <contents.length -2 ){
                    searchTerm += contents[i+1] + "+";
                }else{
                    searchTerm += contents[i+1];
                }
            }

            var apiUrl = api + searchTerm + fullApiKey;         //Giphy api url is combined here
          
            searchReply = "Search did not work";
            getJSON(apiUrl, function(error, response){      //Get JSON data from url
                console.log(error);
                // undefined
                console.log(response.data.length);
                console.log(response.data[24].url);
                console.log(isRandom);

                if (isRandom){
                    var result = Math.floor(Math.random() * 25);  
                    searchReply = response.data[result].url;         //Sends url from first result
                }else{
                    searchReply = response.data[0].url;         //Sends url from first result
                }
                 
                
                message.channel.send(searchReply);          //sends url to chat
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
                    .addField("Version:","1.1.0")
                    .addField("Updated:","26.12.2018")
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
        message.reply("You didn't ask a question, please try again with the format \n" + ".8ball \[Your question\]") //Remind user how to use command
    }
    
     //-------PING------------
    if (msg === prefix + 'PING') {
        //Simple commmand that will post a message back, "Pong!" in this case.
        message.channel.send('Pong!');
    }

    //--------PLAY------------
    //This command will activate if bot isReady to play music
    if (isReady && msg.startsWith(prefix + 'PLAY')) {
        //Bot joins a channel to play the youtube url sound.
        
        //This checks if the sender of the message is not a chat.
        if(!message.member.voiceChannel){
            message.channel.send('You need to be in a chat.');  //Remind user that they need to be in a voicechat to use this command.
            return;
        }
        message.channel.send("Playing");
        var video;                                      //Creates variable video.
        video = url.substring(5, msg.length+1);         //Cuts the message so that the url is left.
        isReady = false;                                //Sets bots variable to false so that no other music commmand can be played at the same time. 
        var voiceChannel = message.member.voiceChannel; //Saves what voice channel to join.
        voiceChannel.join().then(connection =>{         //Joins voice channel and then:
            const dispatcher = connection.playStream(YTDL(video, {filter: "audioonly"}));   //Plays sound from youtube video.
            dispatcher.on("end", end => {               //When Music ends it executes following:
                voiceChannel.leave();                   //Leaves the voice channel and
                isReady = true;                         //sets isReady to True.
            });
        }).catch(err => console.log(err));              //consolelogs errors.
    }
    
    //--------ROLL------------
    if (msg === prefix + 'ROLL'){
        //Rolls a random number between 1 and 100
        message.reply(Math.floor((Math.random() * 100) + 1));
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
                isReady = true;
            });
        }).catch(err => console.log(err));
    }
    
});

//Your bot token for the bot so that it can connect to the server.
bot.login('<Your Token goes here>');
