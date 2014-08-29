#RSS to MOTD

At the moment, all this does is read the RSS feed of the EthosLab youtube channel, convert the XML to JSON, extract the relevant info from the JSON object and write it to the /etc/motd file.

##Required Modules
+ Request
+ xml2js
+ fs

##TO DO:
+ Read channel info from config.json
+ Structure config.json so that channels can be put in categories.
+ Read MOTD path from config.
+ Output multiple videos to MOTD.
+ Maintain email list in config.
+ Email content synopsis to those in list.
+ Read RSS check interval from config.

##Notes: 
The user under which this node app is started will need write access to the file it writes to and read access on the config file.
