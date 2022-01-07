const Bdd = require('../app/Bdd.js');

module.exports = {
 
    run: async (client, member) => {
            
            let oldPseudo = await database.getPseudo(member.user.id);

            if(oldPseudo != member.user.username) {

                await database.updatePseudo(member.user.id, member.user.username);
                client.logger.log('player', `Le joueur ${  oldPseudo } a changé de pseudo pour ${  member.user.username }`);

            };

            
    }
};