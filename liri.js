
var axios = require("axios");
var keys = require("./keys.js");
var dot = require("dotenv").config();
// Includes the FS package for reading and writing packages
var fs = require("fs");
var Spotify = require('.env');
var filename = './log.txt';

var userCommand = process.argv[2];
var secondCommand = process.argv[3];
var divider =
    "\n------------------------------------------------------------\n\n";

//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}


// Fetch Spotify Keys
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
var getArtistNames = (function (artist) {
    return artist.name;
});

// Function for running a Spotify search - Command is spotify-this-song
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "I Want it That Way";
    }

    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

function mySwitch(userCommand) {

    //choose which statement (userCommand) to switch to and execute
    switch (userCommand) {

        case "spotify-this-song":
            getSpotify();
            break;
            
            case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }

  //OMDB Movie - command: movie-this
    function getMovie() {
        // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
        var movieName = secondCommand;
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            // If the request is successful = 200
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);

                //Simultaneously output to console and log.txt via NPM simple-node-logger
                console.logOutput('================ Movie Info ================');
                console.llogOutput("Title: " + body.Title);
                console.llogOutput("Release Year: " + body.Year);
                console.llogOutput("IMdB Rating: " + body.imdbRating);
                console.llogOutput("Country: " + body.Country);
                console.llogOutput("Language: " + body.Language);
                console.llogOutput("Plot: " + body.Plot);
                console.llogOutput("Actors: " + body.Actors);
                console.llogOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                console.llogOutput("Rotten Tomatoes URL: " + body.tomatoURL);
                console.llogOutput('==================THE END=================');

            } else {
                //else - throw error
                console.log("Error occurred.")
            }
            //Response if user does not type in a movie title
            if (movieName === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }


//OMDB Movie - command: movie-this
function getMovie() {
    // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    var movieName = secondCommand;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.logOutput('================ Movie Info ================');
            console.llogOutput("Title: " + body.Title);
            console.llogOutput("Release Year: " + body.Year);
            console.llogOutput("IMdB Rating: " + body.imdbRating);
            console.llogOutput("Country: " + body.Country);
            console.llogOutput("Language: " + body.Language);
            console.llogOutput("Plot: " + body.Plot);
            console.llogOutput("Actors: " + body.Actors);
            console.llogOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            console.llogOutput("Rotten Tomatoes URL: " + body.tomatoURL);
            console.llogOutput('==================THE END=================');

        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (movieName === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

    //Function for command do-what-it-says; reads and splits random.txt file
    //command: do-what-it-says
    function doWhat() {
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {
    // Print each element (item) of the array/
    console.log(output[i]);
  }
});
}



}   //Closes mySwitch func - Everything except the call must be within this scope

//Call mySwitch function
mySwitch(userCommand);

