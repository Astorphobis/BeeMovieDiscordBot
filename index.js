const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client();

var fs = require('fs');
var script = fs.readFileSync('script.txt').toString().split("\n");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var lines = parseInt(args[0]);

        switch (cmd) {
            case 'help':
                msg.channel.send('To read out loud the bee movie script, type \'!beemovie [lines]\', eg. \'!beemovie 5\' to say the first five lines of the bee movie script.');
                break;
            case 'beemovie':
                if (lines > script.length) {
                    msg.channel.send('The bee movie script only has ' + script.length.toString() + ' lines.');
                } else if (lines > 0) {
                    for (var i = 0; i < lines; i++) {
                        msg.channel.send(script[i], {tts: true});
                    }
                } else {
                    msg.channel.send('Please specify how many lines to read or type \'!help\'.');
                }
                break;
        }
    }
});

client.login(auth.token);