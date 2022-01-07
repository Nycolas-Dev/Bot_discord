const Bdd = require('../app/Bdd.js');

module.exports = {
 
    run: async (client, member) => {
            
            let result = await database.addPlayer(member.user.id, member.user.username);
            client.logger.log('player', `Le joueur ${  member.user.username } est arrivé.`);

    }
};