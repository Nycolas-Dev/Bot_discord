module.exports = {
    run: async (client, messageReaction, user) => {  
        const idMessage = require('../commands/rush/start').exportConst;
        const Discord = require('discord.js');
        const nameRush = require('../commands/rush/start').nameRush;
        const idRush = require('../commands/rush/start').idRush;
        const duration = require('../commands/rush/start').duration;
        const dateStart = require('../commands/rush/start').dateStart;
        const hourSplitStart = require('../commands/rush/start').hourSplitStart;
        const timeResult = require('../commands/rush/start').timeResult;
        const Bdd = require('../app/Bdd.js');
        let reactionId =  messageReaction.message.id;
        let reactionEmoji = messageReaction.emoji.name;

        if (idMessage === reactionId && reactionEmoji === '🌀' && user.id != '817169336074371072') {

            // new Bdd().connect().then(async database => {
            let rush = await database.getRush(idRush);
            console.log(rush)
                
            if (rush.etat_id_etat === 1) {

            let userId = user.id;
            client.guilds.cache.map(user => {
                let member = user.members.cache.get(userId);
                user.roles.fetch("696990674666389504").then(role => {
                    member.roles.add([role]).catch(console.error);
                })
            })
            await database.addPlayerRush(rush.id_rush, userId);

            
            const embedConfirm = new Discord.MessageEmbed();
            embedConfirm
                .setColor(`#F04C47`)
                .setTitle(`🌀 Confirmation de participation 🌀`)
                .setDescription(
                    `Bonjour ${user.username}, \nVotre participation au ${idRush}e rush sur le jeu "${nameRush}" est bien confirmée. \nIl commencera le ${dateStart} à ${hourSplitStart[0]}h${hourSplitStart[1]} et durera ${timeResult.Days} jour(s) et ${timeResult.Hours} heure(s). \nAmusez-vous bien !`);
            user.send(embedConfirm);
            
        } else {

            const embedStarted = new Discord.MessageEmbed();
            embedStarted
                .setColor(`#F04C47`)
                .setTitle(`🌀 Erreur 🌀`)
                .setDescription(
                    `Bonjour ${user.username}, \nLe ${idRush}e rush sur le jeu ${nameRush} est actuellement en cours. \nSi vous souhaitez tout de même vous inscrire merci de contacter <@343469541000609794> ou <@279974744844009473>.`);
            user.send(embedStarted);

            }
        // })
        }
    }
};