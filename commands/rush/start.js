const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Time = require('../../app/Time.js');
module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'start',
			memberName: 'start',
			group: 'rush',
			description: 'Commande pour lancer un rush',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
            args: [
                {
                    key: 'name',
                    prompt: 'Entrez le nom du jeu',
                    type: 'string',
                },
                {
                    key: 'dateStart',
                    prompt: 'Date début --> DD/MM/YYYY',
                    type: 'string',
                },
                {
                    key: 'hourStart',
                    prompt: 'Heure de début --> HH:MM:SS',
                    type: 'string',
                },
                {
                    key: 'dateEnd',
                    prompt: 'Date fin --> DD/MM/YYYY',
                    type: 'string',
                },
                {
                    key: 'hourEnd',
                    prompt: 'Heure de fin --> HH:MM:SS',
                    type: 'string',
                },
            ],

	});
	}

	async run(msg, { name, dateStart, hourStart, dateEnd, hourEnd }) {  

        try {
            
            await database.addRush(name, dateStart, hourStart, dateEnd, hourEnd);
    
            /*** Gestion des participants ***/
    
            //Création et envoie d'un embed dans le channel présence-rush
            let rush = await database.getRushNotStart();
    
            const hourSplitStart = hourStart.split(':');
            const hourSplitEnd = hourEnd.split(':');
    
            let dateFormatStart =  await new Time().formatDate(dateStart);
            let dateFormatEnd =  await new Time().formatDate(dateEnd);
            const dateStartObject = new Date(`${dateFormatStart}T${hourStart}`);
            const dateEndObject = new Date(`${dateFormatEnd}T${hourEnd}`);
            let durationInHours = await new Time().getDurationInHours(dateStartObject, dateEndObject);
            let timeResult = await new Time().splitTime(durationInHours)
    
            const embedAdd = [
                `> Le jeu rushé va être: **${name}**  🚀☄️`,
                `> \u200b`,
                `> ** 🪐 Info du rush 🪐 **`,
                `> Début : Le ${dateStart} à ${hourSplitStart[0]}h${hourSplitStart[1]}`,
                `> Fin : Le ${dateEnd} à ${hourSplitEnd[0]}h${hourSplitEnd[1]}`,
                `> Durée : ${timeResult.Days} jour(s) et ${timeResult.Hours} heure(s).`,
            ]
            const embed = new Discord.MessageEmbed();
            embed
                .setColor(`#FFED17`)
                .setTitle(`🌀 Inscriptions au ${rush.id_rush}e rush ! 🌀`)
                .setDescription(
                `Les votes sont terminés, le moment est venu de dévoiler le jeu pour ce rush !
                
                🥁 *roulement de tambour* 🥁
                \n${embedAdd.join('\n')}
                \nPour participer au rush, il suffit de **mettre la réaction "🌀" sur ce message.** Un mp de confirmation vous sera envoyé ! (Pour supprimer la participation, retirer la réaction tout simplement)
                \nLes participations sont ouvertes jusqu'au début du rush. Chaque participants deviennent des <@&696990674666389504> !
                \nSi vous souhaitez participer alors que le rush est déjà en cours, n'hésitez pas à MP le merveilleux <@343469541000609794> ou le magnifique <@279974744844009473>. (Pour voir le rush en cours --> !rush)
                \u200B`)
                .setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`);
            const channel = this.client.channels.cache.find(channel => channel.name === '✅inscription-rush');
            await channel.send(embed);
    
                /** Gestion des réactions **/
    
            //Ajout d'une réaction par défault au message
            this.client.user.lastMessage.react('🌀')
    
            //Export de l'ID du message (pour le messageReactionAdd et messageReactionRemove)
            //et export de ID du rush (présent au début du code)
            const idMessage = this.client.user.lastMessageID;
            module.exports = { exportConst: idMessage, idRush: rush.id_rush, nameRush: name, dateStart : dateStart, timeResult: timeResult, hourSplitStart: hourSplitStart };
    
    
            //Fonction qui appelle une autre fonction
            //création d'une autre commande pour la suite du rush -> fonction qui check si la date donnée est égal à la date du jour, si c'est le cas, le bot lance la commande
    
                    // Lancer un rush = embed de lancement, etat du rush 'en cours' commande !restart
                    //Fin de rush = embed de fin, suppression role rusher, etat du rush 'terminé' 
    
            let today = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
            today = today.split(', ');
            let dateFormatToday =  await new Time().formatDate(today[0]);
            const dateTodayObject = new Date(`${dateFormatToday}T${today[1]}`);
    
            let durationInMsForStart = await new Time().getDurationInMs(dateTodayObject, dateStartObject);
            console.log(durationInMsForStart)
    
            let botName = this.client.user.username;
            let botImage = this.client.user.displayAvatarURL();

            const channeltwo = this.client.channels.cache.find(channeltest => channeltest.name === 'avancée-rush');
    
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
                    `> ** 🪐 Info du rush 🪐 **`,
                    `> Début : Le ${dateStart} à ${hourSplitStart[0]}h${hourSplitStart[1]}`,
                    `> Fin : Le ${dateEnd} à ${hourSplitEnd[0]}h${hourSplitEnd[1]}`,
                    `> Durée : ${timeResult.Days} jour(s) et ${timeResult.Hours} heure(s).`,
                ]
                embedStart
                    .setColor(`#FFED17`) 
                    .setTitle(`🌀 Départ du ${rush.id_rush}e rush ! 🌀`)
                    .setDescription(
                    `Bienvenue <@&696990674666389504> sur le rush ${name} !
                    \nVous pouvez désormais lancer le jeu, n'hésitez pas à venir discuter et vous challenger sur le channel <#696991842205696020> du rush !
                    \n${embedAddStart.join('\n')}
                    \nNous détermineront au cours du rush l'objectif à atteindre (Le level, les points, l'avancé général etc.) ainsi que les rôles à gagner.
                    \nEt bien sûr le plus important : **AMUSEZ-VOUS !!!**
                    \u200B`)
                    .addField(`Liste des participants : `, `${participants.join(' | ')}`)
                    .setFooter(`${botName}, pour vous servir.`, `${botImage}`);
        
                await channeltwo.send(embedStart);
                //msg.say(embedStart);
    
                let durationInMsForEnd = await new Time().getDurationInMs(dateStartObject, dateEndObject);
                setTimeout(async function() {
                    //Modification dans la bdd de l'etat du rush + message de fin
                    let etat = await database.updateEtat(rush.id_rush, '3'); 
                    //msg.say(`Le rush sur ${ name } est terminé !`)

                    const embedEnd = new Discord.MessageEmbed(); // création de l'embed
                    //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

                    embedEnd
                        .setColor(`#FFED17`)
                        .setTitle(`:cyclone: Fin du ${rush.id_rush}e rush !:cyclone:`)
                
                        .setDescription(`LE RUSH EST TERMINÉ !\n \n`
                        +`Bien joué à vous ! Ce rush devait être intense :crossed_swords:\n \n`
                        +`Vous avez 1h pour poster le screen de votre avancée dans le canal <#699348417998225479> 📷\n \n`
                        +`N'oubliez pas que même si vous pensez avoir un faible score, il est necessaire de poster la capture d'écran de votre résultat pour gagner votre XP de Rusher :raccoon:\n \n`)

                    ;

                    await channeltwo.send(embedEnd);
                    //msg.say(embedEnd)
        
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
    
            }, durationInMsForStart)

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !start -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }

    }  
};