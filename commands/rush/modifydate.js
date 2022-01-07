const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'modifydate',
			memberName: 'modifydate',
			group: 'rush',
			description: 'Modification des dates',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
                {
					key: 'idRush',
					prompt: 'Id du rush',
					type: 'string',
                },
                {
					key: 'startOrEnd',
					prompt: 'Choix de modifier la date de début ou la date de fin : start or end',
					type: 'string',
                },
                {
					key: 'date',
					prompt: 'Format : DD/MM/YYYY',
					type: 'string',
                },
                {
					key: 'hour',
					prompt: 'Format : HH:MM:SS',
					type: 'string',
                },
            ],

	});
	}

	async run(msg, { idRush, startOrEnd, date, hour }) {  

		try {
				
			if(startOrEnd === 'start') {
				await database.updateDateStart(idRush, date, hour);
			}
			else if (startOrEnd === 'end') {
				await database.updateDateEnd(idRush, date, hour);
			}

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !modifydate -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
		}

	}
};