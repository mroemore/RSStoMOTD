// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
 
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'RSStoMOTD';

var request = require('request');
var fs = require('fs');
//var xml2json = require('xmltojson');
var resp = {done: false, body: "ye", result: "NONE"};
//console.log(xml2json);

var parseString = require("xml2js").parseString;
console.log(parseString)
var interval = 6000;

//include config
var data = require('./config');
console.log(data);

 
/**
 * Global variables
 */
var date = new Date();
var lastCheckedDay  = -1;
var lastCheckedHour = -1;

/**
 * Helper function for escaping input strings
 */

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function checkTimeElapsed(){
    date = new Date();
    var currentDay = date.getDay();
    var currentHour = date.getHours();

    if(currentDay > lastCheckedDay || currentHour > lastCheckedHour){
        lastCheckedDay = currentDay;
        lastCheckedHour = currentHour;
        getFeeds('youtube');

        fs.writeFile('/etc/motd', "" , function (err) { //init the file to be blank
            if (err) throw err;
            console.log('Wrote to file.');
        });
    }else {
        console.log("did not check.");
    }

    if(resp.done){
        
        /*fs.writeFile('/etc/motd',"Most recent EthosLab video: \n" + resp.result['feed']['entry'][0]['title'][0]['_']+ "\nLink: \n" + resp.result['feed']['entry'][0]['media:group'][0]['media:content'][0]['$']['url'], function (err) {
            if (err) throw err;
            console.log('Wrote to MOTD file.');
        });*/

        

        //for

        //console.log(resp.result['feed']['entry'][0]['title'][0]['_']);
        //console.log(resp.result['feed']['entry'][0]['media:group'][0]['media:content'][0]['$']['url']);
        //resp.done = false;
    }

    console.log("req executed.");
}

function getFeeds(feedType) {
    if(feedType == "youtube"){

    }
} //feedType should be a top level category in the config file like 'youtube'

function getYoutubeFeed(dataObj){
    var urlBefore = "https://gdata.youtube.com/feeds/api/users/";
    var urlAfter = "/uploads?v=1&max-results=";

    for(var key in datObj['youtube']){
        if(datObj['youtube'][key] != undefined){
            console.log('getting feeds for : ' + key);
            for(var i = 0; i < datObj['youtube'][key].size; i++){
                var finalUrl = urlBefore + datObj['youtube'][key][i]['userID'] + urlAfter + datObj['youtube'][key][i]['vidCount'];
                rssToObj(finalUrl, datObj['youtube'][key][i]);
            }
        } else {
            console.log('undefined: ' + key);
        }
    }
}

function appendYTFeedtoFile(fileDir, dataObj){
    parseString(resp.body, function(err, result) {resp.result = result;});

    for(var key in dataObj['youtube']){
        fs.appendFile('/etc/motd', 
            "\n " + 
            dataObj['youtube'][key], 
            function (err){
                if (err) throw err;
                console.log('Appended to file.');
            }
        );
        for(var i = 0; i < dataObj['youtube'][key].size; i++){
            fs.appendFile('/etc/motd', 
            "\n " + 
            dataObj['youtube'][key], 
            function (err){
                if (err) throw err;
                console.log('Appended to file.');
            }
        );
        }
    }
}

function rssToObj(url, a){ //a should be data['category'] where category is something like 'youtube'
    //resp.body = "gg no re";
    a.done = false;

    var cb = function (error, response, body) {
        if (!error && response.statusCode === 200) {

            parseString(body, function(err, result) {a.result = result; console.log(a);});
        } else {
            console.log('error retrieving RSS feed.');
            console.log(error)
        }
    }

    request(url, cb);
}

/**
* Program Code
*/

setInterval(checkTimeElapsed, interval);
