module.exports = {
    run: async (client, messageReaction, user) => {  
        const idMessage = require('../commands/rush/start').exportConst;
        const Discord = require('discord.js');
        const nameRush = require('../commands/rush/start').nameRush;
        const idRush = require('../commands/rush/start').idRush;
        const Bdd = require('../app/Bdd.js');
        let reactionId =  messageReaction.message.id;
        let reactionEmoji = messageReaction.emoji.name;


        if (idMessage === reactionId && reactionEmoji === '🌀') {

                let rush = await database.getRush(idRush);
                console.log(rush)
                    
                if (rush.etat_id_etat === 1) {
    
                let userId = user.id;
                client.guilds.cache.map(user => {
                    let member = user.members.cache.get(userId);
                    user.roles.fetch("696990674666389504").then(role => {
                        member.roles.remove([role]).catch(console.error);
                    })
                })
                await database.removePlayerRush(rush.id_rush, userId);


            const embedCancel = new Discord.MessageEmbed();
            embedCancel
                .setColor(`#F04C47`)
                .setTitle(`🌀 Confirmation d'annulation 🌀`)
                .setDescription(
                    `Bonjour ${user.username}, \nVous avez annulé votre participation au rush sur le jeu ${nameRush}.`);
            user.send(embedCancel);
        } 
        } 
    }
};