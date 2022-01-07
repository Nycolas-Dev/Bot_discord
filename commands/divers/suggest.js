const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'suggest',
			memberName: 'suggest',
			group: 'divers',
			description: '',
			examples: [''],
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
                {
					key: 'link',
					prompt: 'Lien du jeu',
					type: 'string',
                },
                {
					key: 'name',
					prompt: 'Nom du jeu',
					type: 'string',
                },
            ],

	});
	}

	async run(msg, { name, link }) { 

		try {
			await database.addSuggest(name, link);

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !suggest -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
		}
	}
};

