const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rush',
			memberName: 'rush',
			group: 'players',
			description: 'Commande info rush.',
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },

	});
	}

	async run(msg) {  

        try {
            
            let rushInRun = await database.getRushInRun();
    
            if (rushInRun === undefined) {
                msg.say("il n'y a pas de rush en cours actuellement.")
            }
            else {
    
                let dateFormatStart =  await new Time().formatDate(rushInRun.date_start);
                let dateFormatEnd =  await new Time().formatDate(rushInRun.date_end);
    
                const dateStart = new Date(`${dateFormatStart}T${rushInRun.hour_start}`);
                const dateEnd = new Date(`${dateFormatEnd}T${rushInRun.hour_end}`);
    
                let durationInHours = await new Time().getDurationInHours(dateStart, dateEnd);
                let timeResult = await new Time().splitTime(durationInHours)
    
                let idParticipants = await database.getParticipants(rushInRun.id_rush);
    
                let participants = [];
                idParticipants.forEach((participant) => {
                    participants.push(participant.players_id_discord);
                })
                participants = participants.map(id => `<@${id}>`) 
    
                let roleRushInRun = await database.getRoleRushInRun(rushInRun.id_rush);
    
            const embed = new Discord.MessageEmbed();
                embed
                    .setDescription(`
                    Le rush en cours est sur le jeu ${rushInRun.name}. Date de départ : ${rushInRun.date_start}, Heure de départ : ${rushInRun.hour_start},
                    Date de fin : ${rushInRun.date_end}, Heure de fin : ${rushInRun.hour_end}. Durée : ${timeResult.Days} jour(s) et ${timeResult.Hours} heure(s).
    
                    Les participants sont : ${participants.join(' | ')}
    
                    Les rôles à gagner : 1er = <@&${roleRushInRun.role_first}>, 2ème = <@&${roleRushInRun.role_second}>, 3ème = <@&${roleRushInRun.role_third}>
    
                    `)
                    .setColor('#AF0808')
                    .setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`)
                msg.say(embed);
            }

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !rush -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
        }

    }  
};