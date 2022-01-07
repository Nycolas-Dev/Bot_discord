const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'listsuggest',
			memberName: 'listsuggest',
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
            ],

	});
	}

	async run(msg, { name, link }) { 

        try {

            let listSuggest = await database.getSuggest();
            console.log(listSuggest);
    
            let suggestTab = [];
            listSuggest.forEach((suggest) => {
                suggestTab.push(suggest.name, `||${suggest.link}||`);
            })
            console.log(suggestTab);
    
            const embed = new Discord.MessageEmbed();
            embed
                .setDescription(`Test suggestions`)
                .setColor('#AF0808')
                .addField(`*insérer nom catégorie*`, `${suggestTab.slice(0,14).join(' \n ')}`)
    
            // const embedTwo = new Discord.MessageEmbed();
            // embedTwo
            //     .setDescription(`Test suggestions`)
            //     .setColor('#AF0808')
            //     .addField(`*insérer nom catégorie*`, `${suggestTab.slice(14,30).join(' \n ')}`)
    
            // const embedThree = new Discord.MessageEmbed();
            // embedThree
            //     .setDescription(`Test suggestions`)
            //     .setColor('#AF0808')
            //     .addField(`*insérer nom catégorie*`, `${suggestTab.slice(30,44).join(' \n ')}`)
    
            // const embedFour = new Discord.MessageEmbed();
            // embedFour
            //     .setDescription(`Test suggestions`)
            //     .setColor('#AF0808')
            //     .addField(`*insérer nom catégorie*`, `${suggestTab.slice(44,60).join(' \n ')}`)
    
            // const embedFive = new Discord.MessageEmbed();
            // embedFive
            //     .setDescription(`Test suggestions`)
            //     .setColor('#AF0808')
            //     .addField(`*insérer nom catégorie*`, `${suggestTab.slice(60,74).join(' \n ')}`)
    
            // const embedSix = new Discord.MessageEmbed();
            // embedSix
            //     .setDescription(`Test suggestions`)
            //     .setColor('#AF0808')
            //     .addField(`*insérer nom catégorie*`, `${suggestTab.slice(74,82).join(' \n ')}`)
    
            msg.say(embed);
            // msg.say(embedTwo);
            // msg.say(embedThree);
            // msg.say(embedFour);
            // msg.say(embedFive);
            // msg.say(embedSix);

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !listsuggest -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }
};

