const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');
const winston = require('winston');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			memberName: 'test',
			group: 'divers',
			description: 'Commande de test.',
			examples: ['Ceci est un test','Ceci est un autre test.'],
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: false,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
			args: [
            ],

	});
	}

	async run(msg) { 

		let pseudo = await database.getPseudo('343469541000609794');
		
		console.log(pseudo);
		console.log("test");
	}
};

