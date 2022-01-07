const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'concept',
            memberName: 'concept',
            group: 'divers',
            description: 'Présentation du concept Mobile Rush.',
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

        const actions = [
            '> :small_blue_diamond:**Sur quel style de jeu ?**',
            '> On rush tout types de jeux disponible sur le store ! Ça peut passer par un idle game, un gacha, action, aventure, RPG, ...etc',
            '> :small_blue_diamond:**A quelle fréquence ?**',
            '> Un rush peut durer quelques heures, jours, une semaine, ou même plus ! Cela se décidera avant de commencer le rush.',
            '> :small_blue_diamond:**Comment on va gérer ça ?**',
            '> Notre bot <@817169336074371072> développé uniquement pour ce serveur vous annoncera les différentes étapes du rush.',
        ]
        embed
            .setColor(`#F04C47`) // ou .setColor(`#0099ff`)
            .setTitle(`:cyclone: Présentation du concept "Mobile Rush" :cyclone:`)
    
            .setDescription(
            `Le but de ce serveur est d'organiser des "rush" de jeux mobiles, c'est à dire organiser sur un laps de temps une mini compétition basée sur l'avancée des joueurs sur un jeu donné. Le concept est simple et permet de tous nous amuser sur un jeu qu'il sois bien/pourri. Je souhaite créer une communauté grandissante qui cherche juste du fun en groupe sur des jeux mobiles. Les rush nous permettront de faire de petites compétitions mais également de nous défier, discuter, créer des guildes, des affinités ...etc. 
            \n${actions.join('\n')}
            \u200B
            `)
            // Plusieurs sur une même ligne :
            .addField(`:gear: Déroulement des Rush`,`Pour en savoir plus sur le déroulement des rush, RDV dans le salon <#722447205621039254>`, true)
            .addField(`:newspaper: News`,`Pour connaitre toutes les nouveautés et nouvelles importantes du serveur, RDV dans le salon <#710229952519208979>`, true)
            .addField(`:scroll: Les règles`,`Pour connaitre toutes les règles du serveur ainsi que des rush, dirigez vous vers le salon <#697012817521279039>`)
            .addField(`:moneybag: Les gains`,`A la fin de chaque rush, un podium sera établi, vous gagnerez alors des rôles discord selon votre place dans le classement.`)
        ;
    
        const channel = this.client.channels.cache.find(channel => channel.name === '💫concept');
        await channel.send(embed);
    };
}