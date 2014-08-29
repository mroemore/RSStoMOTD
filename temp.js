//working out new config muncher - NOM OM NOM ARHGHG

var configObject;

function getRSS(configObject, feedType) {
	var tempObj = configObject[feedType];
	var finalURL = "";
	if(configObject[feedType]["rssParams"] != undefined){
		var splitURL = configObject[feedType]["rssURL"].split("{{}}");
		for(var index = 0; i < splitURL.length; i++){
			finalUrl += splitURL[index];
			if(i < splitURL.length-1)
				finalUrl += configObject[feedType]["rssParams"][i];
		}
	} else {
		finalUrl = configObject[feedType]["rssURL"];
	}
	for(var key in tempObj){
		if(tempObj[key])
	}
}