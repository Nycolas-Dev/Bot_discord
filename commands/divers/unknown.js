const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unknown',
            memberName: 'unknown',
            group: 'divers',
            description: 'Unknown commande.',
            unknown: true,
            hidden: true,
        });
    }
    async run(msg) {
        msg.say(`Ceci est une commande qui n'existe pas, dommage haha. Pour voir les commandes existantes, fait !help.`) //METTRE MESSAGE ALEATOIRE
    };
}