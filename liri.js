var keys = require("./keys.js");
var Twitter = require('twitter');
var first = process.argv[2];
var second = process.argv[3];
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require('request');


function liri(input1, input2) {
    switch (input1) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThis(input2)
            break;
        case "movie-this":
            movieThis(input2)
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log(first + " does not exist.");
    };
};

function myTweets() {

    
    var client = new Twitter(keys.twitterKeys);

    var user = 'moeszyslak00';
    var tweetCount = 20;

    client.get('statuses/user_timeline', {screen_name: user, count: tweetCount}, function(error, tweets) {

        if (error) {
            console.log(error);
        }
        else {
            var tweet_data = [];

            for ( i in tweets ) {
                var data = {
                        "Created"   : tweets[i].created_at,
                        "Tweet"     : tweets[i].text
                        };
                tweet_data.push(data);
            };

            console.log("------------------------------------------------------------");
            console.log(JSON.stringify(tweet_data, null, 2));
            console.log("------------------------------------------------------------");
        };
    });
};


function spotifyThis(song) {

var spotify = new Spotify(keys.spotifyKeys);


        spotify.search({ type: 'track', query: second }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } else {
            console.log("------------------------------------------------------------");
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Album Title: " + data.tracks.items[0].album.name);
            console.log("Listen Here: " + data.tracks.items[0].preview_url);
            console.log("------------------------------------------------------------"); 
        };

    });

};











liri(first, second);


