const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bestrushers',
			memberName: 'bestrushers',
			group: 'players',
			description: '',
			examples: [''],
			aliases: ['top'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
            ],

	});
	}

	async run(msg) { 

		try {

			let tops = await database.getTopThreeLvl();
	
			let topTab = [];
			tops.forEach((top) => {
				topTab.push(`<@!${top.id_discord}>`, `Lvl ${top.lvl}`);
			})
	
	
			const embed = new Discord.MessageEmbed();
			embed
				.setAuthor(`Classement des Rushers`)
				.setDescription(`Blablabla`)
				.setColor('#AF0808')
				.addField(`Classement : `, topTab.join(' '))
				.setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`)
			msg.say(embed);

		} catch (error) {
			this.client.logger.log('error', `Erreur commande : !bestrushers -> ${msg.author.username} : ${error}`);
			msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
		}


	}
};

