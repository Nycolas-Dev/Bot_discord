const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addplayer',
			memberName: 'addplayer',
			group: 'rush',
			description: 'Commande de test.',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
                {
					key: 'idPlayer',
					prompt: 'Id ou @ joueur à ajouter au dernier rush',
					type: 'string',
                },
            ],

	});
	}

	async run(msg, { idPlayer }) {  

		try {

			idPlayer = idPlayer.replace('<@!', "");
			idPlayer = idPlayer.replace('>', "");
	
			let rush = await database.getRushInRun();

			
			//Ajout du role rusher
	
			let result = await database.addPlayerRush(rush.id_rush, idPlayer);
	
			this.client.guilds.cache.map(user => {
				let member = user.members.cache.get(idPlayer);
				user.roles.fetch("696990674666389504").then(role => {
					member.roles.add([role]).catch(console.error);
				})
				console.log(member)

				const embedConfirm = new Discord.MessageEmbed();
				embedConfirm
					.setColor(`#F04C47`)
					.setTitle(`🌀 Confirmation de participation 🌀`)
					.setDescription(
						`Bonjour ${member.user.username}, \nVotre participation au ${rush.id_rush}e rush sur le jeu "${rush.name}" est bien confirmée. \nIl a commencé le ${rush.date_start} à ${rush.hour_start}. \nAmusez-vous bien !`);
				member.send(embedConfirm);

			})

			console.log(result);
			
			//a faire : ajout rôle rusher + envoie mp + ajout participant embed
		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !addplayer -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
		}

	}
};