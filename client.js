const { CommandoClient } = require('discord.js-commando')
const winston = require('winston')

module.exports = class BotClient extends CommandoClient {
    constructor(options) {
        super(options);

        const myCustomLevels = {
            levels: { 
                emerg: 0, 
                alert: 1, 
                crit: 2, 
                error: 3, 
                warning: 4, 
                notice: 5, 
                info: 6, 
                debug: 7,
                bdd: 6,
                player: 6,
            },
          };

        // initialisation du logger
        this.logger = winston.createLogger({
            levels: myCustomLevels.levels,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'console.log' })
            ],
            format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`),
            
        });

        this.on('debug', m => this.logger.log('debug', m));
        this.on('bdd', m => this.logger.log('bdd', m));
        this.on('player', m => this.logger.log('player', m));
        this.on('warn', m => this.logger.log('warn', m));
        this.on('error', m => this.logger.log('error', m));     

        process.on('uncaughtException', error => this.logger.log('error', error));
    }
};