const Bdd = require('../app/Bdd.js');

module.exports = {
    run: async (client) => {
        client.logger.log('info', `Bot identifié en tant que ${client.user.tag}! (${client.user.id})`);

        global.database = new Bdd();
    }
};