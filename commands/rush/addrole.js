const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');


module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addrole',
			memberName: 'addrole',
			group: 'rush',
			description: 'Commande pour ajouter les rôles d\'un rush',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
            args: [
                {
                    key: 'firstRole',
                    prompt: 'Entrez le rôle du 1er',
                    type: 'string',
                },
                {
                    key: 'secondRole',
                    prompt: 'Entrez le rôle du 2ème',
                    type: 'string',
                },
                {
                    key: 'thirdRole',
                    prompt: 'Entrez le rôle du 3ème',
                    type: 'string',
                },
                {
                    key: 'idRush',
                    prompt: 'Entrez l\'id du rush',
                    type: 'string',
                },
            ],
	});
	}

	async run(msg, { firstRole, secondRole, thirdRole, idRush }) {  
        
        try {

            if(firstRole === '0'){
                firstRole = null
                await database.removeForeignKeyCheck();
            }
            if(secondRole === '0'){
                secondRole = null
                await database.removeForeignKeyCheck();
            }
            if(thirdRole === '0'){
                thirdRole = null
                await database.removeForeignKeyCheck();
            }

            await database.addRoleBdd(firstRole);
            await database.addRoleBdd(secondRole);
            await database.addRoleBdd(thirdRole);
            
            
            let result = await database.addRoleRush(idRush, firstRole, secondRole, thirdRole);

            console.log(result);
            
        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !addrole -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }

    }  
};