const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');
const InfoCommand = require('../players/info.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addbio',
			memberName: 'addbio',
			group: 'players',
			aliases: ['bio'],
			description: 'Modifier sa description.',
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
                {
					key: 'desc',
					prompt: 'Ecrit ta description ici',
					type: 'string',
                    wait: 6000
                },
            ],

	});
	}

	async run(msg, { desc }) {  

		try {

			let result = await database.addBio(msg.author.id, desc);

			//new InfoCommand(this.client).run(msg.author);

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !addbio -> ${msg.author.username} : ${error}`);
			msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
		}

	}
};