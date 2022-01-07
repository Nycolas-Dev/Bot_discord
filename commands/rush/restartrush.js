const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restartrush',
			memberName: 'restartrush',
			group: 'rush',
			description: 'Commande pour relancer le rush non débuté ou en cours',
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
            
            let rush = await database.getRushNotStart();
            let runOrStart = false;
            if(rush === undefined) {
                rush = await database.getRushInRun();
                console.log(rush)
                runOrStart = true;
            }
    
            let today = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
            today = today.split(', ');
            let dateFormatToday =  await new Time().formatDate(today[0]);
            const dateTodayObject = new Date(`${dateFormatToday}T${today[1]}`);
    
    
            let hourStart = rush.hour_start;
            let hourEnd = rush.hour_end;
            const hourSplitStart = hourStart.split(':');
            const hourSplitEnd = hourEnd.split(':');
    
            let dateFormatStart =  await new Time().formatDate(rush.date_start);
            let dateFormatEnd =  await new Time().formatDate(rush.date_end);
            const dateStartObject = new Date(`${dateFormatStart}T${hourStart}`);
            const dateEndObject = new Date(`${dateFormatEnd}T${hourEnd}`);
            console.log(dateStartObject,dateEndObject)
            let durationInHours = await new Time().getDurationInHours(dateStartObject, dateEndObject);
            let timeResult = await new Time().splitTime(durationInHours)
    
            let durationInMsForStart = await new Time().getDurationInMs(dateTodayObject, dateStartObject);
            console.log(durationInMsForStart)
    
            let botName = this.client.user.username;
            let botImage = this.client.user.displayAvatarURL();
    
            if(runOrStart === false) {
    
                setTimeout(async function() {
    
                    let etat = await database.updateEtat(rush.id_rush, '2');
                    console.log(etat);
        
                    let idParticipants = await database.getParticipants(rush.id_rush);
                    let participants = [];
                    idParticipants.forEach((participant) => {
                        participants.push(participant.players_id_discord);
                    })
                    participants = participants.map(id => `<@${id}>`) 
                    
        
                    const embedStart = new Discord.MessageEmbed();
                    const embedAddStart = [
                        `> ** 📄 Info du rush 📄 **`,
                        `> Début : Le ${rush.date_start} à ${hourSplitStart[0]}h${hourSplitStart[1]}`,
                        `> Fin : Le ${rush.date_end} à ${hourSplitEnd[0]}h${hourSplitEnd[1]}`,
                        `> Durée : ${timeResult.Days} jour(s) et ${timeResult.Hours} heure(s).`,
                    ]
                    embedStart
                        .setColor(`#F04C47`) 
                        .setTitle(`🌀 Départ du ${rush.id_rush}e rush ! 🌀`)
                        .setDescription(
                        `Bienvenue <@&696990674666389504> sur le rush ${rush.name} !
                        \nVous pouvez désormais lancer le jeu, n'hésitez pas à venir sur le channel <#696991842205696020> pour discuter du rush !
                        \n${embedAddStart.join('\n')}
                        \nNous détermineront au cours du rush l'objectif à atteindre (Le level, les points, l'avancé général etc.) ainsi que les rôles à gagner.
                        \nEt bien sûr le plus important : **AMUSEZ-VOUS !!!**
                        \u200B`)
                        .addField(`Liste des participants : `, `${participants.join(' | ')}`)
                        .setFooter(`${botName}, pour vous servir.`, `${botImage}`);
            
                    msg.say(embedStart);
        
        
        
                }, durationInMsForStart)
    
                let durationInMsForEnd = await new Time().getDurationInMs(dateStartObject, dateEndObject);
                console.log(durationInMsForEnd)
                setTimeout(async function() {
                    //Modification dans la bdd de l'etat du rush + message de fin
                    let etat = await database.updateEtat(rush.id_rush, '3'); 
                    msg.say(`Le rush sur ${ rush.name } est terminé !`)
        
                    //Supression du rôle rusher pour tout le monde
                    let roles = await msg.guild.roles.fetch("696990674666389504");
                    roles.members.map(user => {
                    user.roles.remove(roles).catch(console.error);
                    })

                    const channel = this.client.channels.cache.find(channel => channel.name === '📊scores-finaux');
                    const role = msg.guild.roles.cache.find(r => r.name === '@everyone');
                    channel.updateOverwrite(role, { SEND_MESSAGES: true });

                    setTimeout(async function() {

                        const channel = this.client.channels.cache.find(channel => channel.name === '📊scores-finaux');
                        const role = msg.guild.roles.cache.find(r => r.name === '@everyone');
                        channel.updateOverwrite(role, { SEND_MESSAGES: false });

                    }, 3600000)

                }, durationInMsForEnd)
            }
    
            if(runOrStart === true) {
                
                let durationInMsForEnd = await new Time().getDurationInMs(new Date(), dateEndObject);
                console.log(durationInMsForEnd)
    
                setTimeout(async function() {
                    //Modification dans la bdd de l'etat du rush + message de fin
                    let etat = await database.updateEtat(rush.id_rush, '3'); 
                    msg.say(`Le rush sur ${ rush.name } est terminé !`)
        
                    //Supression du rôle rusher pour tout le monde
                    let roles = await msg.guild.roles.fetch("696990674666389504");
                    roles.members.map(user => {
                    user.roles.remove(roles).catch(console.error);
                    })

                    const channel = this.client.channels.cache.find(channel => channel.name === '📊scores-finaux');
                    const role = msg.guild.roles.cache.find(r => r.name === '@everyone');
                    channel.updateOverwrite(role, { SEND_MESSAGES: true });

                    setTimeout(async function() {

                        const channel = this.client.channels.cache.find(channel => channel.name === '📊scores-finaux');
                        const role = msg.guild.roles.cache.find(r => r.name === '@everyone');
                        channel.updateOverwrite(role, { SEND_MESSAGES: false });

                    }, 3600000)
                    
                }, durationInMsForEnd)
            }

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !restartrush -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }  
};