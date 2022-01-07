const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const shell = require('shelljs');
const Pagination = require('discord-paginationembed');

module.exports = class StartCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'game', 
			memberName: 'game',
			group: 'divers',
			description: 'Affiche les infos du jeu en fonction de l\'ID donné',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 10,
            },
            args: [
                { 
                    key: 'appID',
                    prompt: 'ID du jeu ?',
                    type: 'string',
                },
            ],
		});
	}

	async run(msg, { appID }) {
        
        try {

                    //Récupération ID channel
        const channel = this.client.channels.cache.find(channel => channel.name === '📝présentation-du-jeu');

        //Appelle librairie shell pour convertir une commande cmd en js
        shell.exec('curl -X GET -H "X-Apptweak-Key: wYpeAqlJx6lSeX1qKBK2lo8GJlw" "https://api.apptweak.com/android/applications/' + appID + '/metadata.json?country=fr&language=fr&max-age=86400"', function(code, stdout, stderr) {
        
            //récupération de l'objet dans une constante
            const { content } = JSON.parse(stdout);
                    
            //Création tableau pour push les embeds
            const embeds = [];
            embeds.push(new Discord.MessageEmbed().setImage(content.feature_graphic));
            //Création des embeds
            for (const item of content.screenshots)
            embeds.push(new Discord.MessageEmbed().setImage(item));
               
            //Propriété pagination + propriété embeds
            new Pagination.Embeds()
            .setArray(embeds)
            .setAuthorizedUsers([])
            .setChannel(channel)
            .setPageIndicator("footer")
            .setDisabledNavigationEmojis(['delete', 'jump'])
            .setTimeout(86400193)
            // Methods below are for customising all embeds
            .setTitle(content.title)
            .setDescription(content.short_description)
            .setURL("https://play.google.com/store/apps/details?id=" + appID )
            .setColor("RED")
            .setTimestamp()
            .setFooter(content.title,content.icon)
            .setThumbnail(content.icon)
            .build();
            
        });

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !game -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }
};