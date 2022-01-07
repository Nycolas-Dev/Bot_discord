// Lien avec le client
const CommandoClient = require('./client');
// on ajoute la librairie path
const path = require('path') 
//config env
const fs = require('fs')
const dotenv = require('dotenv')
const Discord = require('discord.js');

const envConfig = dotenv.parse(fs.readFileSync('.env'))
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

const client = new CommandoClient({
	commandPrefix: process.env.PREFIX, // Préfixe des commandes (ex: ?help)
	owner: process.env.BOT_OWNER_ID, // ID de l'owner du bot, peut également être un tableau d'id pour plusieurs owners, ex: ['ID1', 'ID2']
    disableMentions: 'everyone', // Désactive, par sécurité, l'utilisation du everyone par le bot
    presence: {
        activity: {
            name: `ses esclaves travailler.`, // message de présence
            type: 'WATCHING' // type d'activité
        }
    }
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const { once } = eventFunction;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.logger.on('data', log => {
    if(log.level != 'debug'){

        let channel = client.channels.cache.find(channel => channel.name === 'log-bot');
        let color = '#97D56D';
        const embed = new Discord.MessageEmbed();
        if(log.level === 'error'){
            channel = client.channels.cache.find(channel => channel.name === 'log-bot');
            channel.send(`<@343469541000609794>, <@279974744844009473>`)
            color = '#E30000';
        }
        if(log.level === 'bdd'){
            channel = client.channels.cache.find(channel => channel.name === 'log-bdd');
            color = '#E8F916';
        }
        if(log.level === 'player'){
            channel = client.channels.cache.find(channel => channel.name === 'log-player');
            color = '#2A6EED';
        }
		embed
			.setDescription(`[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
            .setColor(color)
        channel.send(embed);
    }
});


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['divers', 'Divers'], // la première valeur correspond à la section 'group' de votre commande, la deuxième valeur sera utilisée pour l'affichage du nom du groupe, dans l'aide par exemple.
        ['rush', 'Rush'],
        ['bot', 'Bot'],
        ['players', 'Players'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'))
;



// Lancement du bot, avec le token spécifié (que vous avez généré précédemment)
client.login(process.env.BOT_TOKEN);