const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Pagination = require('discord-paginationembed');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'allrush',
			memberName: 'allrush',
			group: 'players',
			description: 'Info de tout les rush.',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },

	});
	}

	async run(msg) {

		try {
			let result = await database.getAllRush();

			const channel = this.client.channels.cache.find(channel => channel.name === 'test-channel-target');
	
			//Création tableau pour push les embeds
			const embeds = [];
			//Création des embeds
			for (const item of result)
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Rush n°${item.id_rush}`)
			.setDescription(`Résumé du Rush sur le jeu ${item.name}`)
			.addField(`Info sur le rush :`, `Début : Le ${item.date_start} à ${item.hour_start}, Fin le ${item.date_end} à ${item.hour_end}`)
			.addField(`Les gagnants :`, `En cours de dev`)
			.addField(`Autres participants :`, `En cours de dev`));

			let test = content;
			   
			//Propriété pagination + propriété embeds
			new Pagination.Embeds()
			.setArray(embeds)
			.setAuthorizedUsers([])
			.setChannel(channel)
			.setPageIndicator("footer")
			.setDisabledNavigationEmojis(['delete', 'jump'])
			.setTimeout(86400193)
			// Methods below are for customising all embeds
			.setColor("RED")
			.setTimestamp()
			.setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`)
			.build();
		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !allrush -> ${msg.author.username} : ${error}`);
			msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
		}



    }  
};