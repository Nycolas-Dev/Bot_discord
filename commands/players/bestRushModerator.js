const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bestrushmoderator',
			memberName: 'bestrushmoderator',
			group: 'players',
			description: '',
			examples: [''],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
            ],
			hidden: true,

	});
	}

	async run(msg) { 

		try {
			msg.say('PYRATHE EST LE BEST RUSH MODERATOR');
		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !bestrushmoderator -> ${msg.author.username} : ${error}`);
			msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
		}
		
	}
};

