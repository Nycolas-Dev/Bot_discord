const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'result',
			memberName: 'result',
			group: 'rush',
			description: 'Commande pour ajouter les résultats après le rush',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
				{
					key: 'dataResult',
					prompt: 'Nouveau résultat, forme : @joueur,place,score  : répéter la commande pour chaque résultat d\'un rush',
					type: 'string',
					wait: 3600,
                },
				{
					key: 'idRush',
					prompt: 'ID Rush',
					type: 'string',
					wait: 3600,
                },
            ],

	});
	}

	async run(msg, { dataResult, idRush }) {  

		try {

			let rush = await database.getRush(idRush);
			
			let formatStat = dataResult.split(',')
	
			formatStat[0] = formatStat[0].replace('<@!', "");
			formatStat[0] = formatStat[0].replace('>', "");
			let verif = await database.addResult(formatStat[0], idRush, formatStat[2], formatStat[1]);
			if(verif) {
				msg.say(`Le résultat à bien été enregistré.`)
			}

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !result -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
		}
    } 
};