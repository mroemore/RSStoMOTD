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
        rssToObj(url);
    }else {
        console.log("did not check.");
    }

    if(resp.done){
        parseString(resp.body, function(err, result) {resp.result = result;});
        fs.writeFile('/etc/motd',"Most recent EthosLab video: \n" + resp.result['feed']['entry'][0]['title'][0]['_']+ "\nLink: \n" + resp.result['feed']['entry'][0]['media:group'][0]['media:content'][0]['$']['url'], function (err) {
            if (err) throw err;
            console.log('Wrote to MOTD file.');
        });
        //console.log(resp.result['feed']['entry'][0]['title'][0]['_']);
        //console.log(resp.result['feed']['entry'][0]['media:group'][0]['media:content'][0]['$']['url']);
        resp.done = false;
    }

    console.log("req executed.");
}

function rssToObj(url){
    //resp.body = "gg no re";
    resp.done = false;

    var cb = function (error, response, body) {
        if (!error && response.statusCode === 200) {
            resp.body = body;
            resp.done = true;
        }
    }

    request(url, cb);
}

/**
* Program Code
*/
var url = "https://gdata.youtube.com/feeds/api/users/ethoslab/uploads?v=1&max-results=1";

setInterval(checkTimeElapsed, interval);
