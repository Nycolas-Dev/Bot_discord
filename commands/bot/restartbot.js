const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const shell = require('shelljs');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restartbot',
			memberName: 'restartbot',
			aliases: ['rbot'],
			group: 'bot',
			description: 'Commande pour redémarrer le bot.',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
	    });
	}

	async run(msg) {  

		try {

			//Exécute la commande dans un terminal cmd
			//Permet de redémarrer le bot (quand il est sur le serveur avec PM2)
			shell.exec('pm2 restart bot', function(code, stdout, stderr) {
				
			});

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !restartbot -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
		}
	}
};