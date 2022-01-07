const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reglesrush',
            memberName: 'reglesrush',
            group: 'divers',
            description: 'Règlement des rush',
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
        });
    }
    async run(msg) {
        const embed = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed
            .setColor(`#FCFF22`) // ou .setColor(`#0099ff`)
            .setTitle(`:scroll: Règlement des Rush :scroll:`)
    
            .setDescription(`Voici les règles à impérativement respecter avant et pendant les rush.\n \n`
            +`:page_with_curl: 1 - Ne pas lancer le jeu avant l'annonce du début du rush..\n \n`
            +`:page_with_curl: 2 - Si vous voulez participer à un rush il faudra recommencer le jeu à 0 (pour ceux qui on déja joués au jeu rushé)..\n \n`
            +`:page_with_curl: 3 - Toutes sortes de triche est strictement interdite . Les rush sont des compétitions qui doivent rester fun.\n \n`
            +`:page_with_curl: 4 - Le cash shop (le fait d'acheter des bonus avec de l'argent réel pour aller plus vite) est interdit. Il faut que tout le monde commence le rush du même pied. Néanmoins le visionnage de publicités dans le jeu est parfaitement autorisé (et même recommandé).\n \n`
            +`:page_with_curl: 5 - Soyez fair-play.\n \n`
            +`:page_with_curl: 6 - ECLATEZ-VOUS BORDEL !\n \n`
            +`*En cas de non respect des règles, <@817169336074371072> appliquera des sanctions plus ou moins lourdes.*`)

        ;
        
        const channel = this.client.channels.cache.find(channel => channel.name === '📄règles');
        await channel.send(embed);
    };
}