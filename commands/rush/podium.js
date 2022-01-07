const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Xp = require('../../app/Xp.js');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'podium',
			memberName: 'podium',
			group: 'rush',
			description: 'Commande pour afficher le podium + ajouter les rôles aux gagnants',
			userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			args: [
                {
					key: 'idRush',
					prompt: 'Id rush',
					type: 'string',
                },
            ],
	});
	}

	async run(msg, {idRush}) { 

        try {

            let rush = await database.getRush(idRush);

            let result = await database.getResult(rush.id_rush);
            result = Object.values(JSON.parse(JSON.stringify(result)))
            let first;
            let second;
            let third;
            let others = [];
            let ranking = [];

            for (const data of result) {
                switch (data.place) {
                    case '1':
                        first = data.players_id_discord;
                        break;
                    case '2':
                        second = data.players_id_discord;
                        break;
                    case '3':
                        third = data.players_id_discord;
                        break;
                }
                if (data.place != '1' && data.place != '2' && data.place != '3') {
                    others.push(data.players_id_discord);
                }

                ranking.push([data.place, data.players_id_discord, data.score]);

            }

            if(first != undefined){
                let xpFirst = await database.getXp(first);
                xpFirst += 30;
                await database.updateXp(first, xpFirst);
                let numberLvlFirst = await new Xp().getLvl(xpFirst);
                await database.updateLvl(first, numberLvlFirst)
            }

            if(second != undefined){
                let xpSecond = await database.getXp(second);
                xpSecond += 25;
                await database.updateXp(second, xpSecond);
                let numberLvlSecond = await new Xp().getLvl(xpSecond);
                await database.updateLvl(second, numberLvlSecond)
            }

            if(third != undefined){
                let xpThird = await database.getXp(third);
                xpThird += 20;
                await database.updateXp(third, xpThird);
                let numberLvlThird = await new Xp().getLvl(xpThird);
                await database.updateLvl(third, numberLvlThird)
            }

            others.forEach(async other => {
                let xpOther = await database.getXp(other);
                xpOther += 10;
                await database.updateXp(other, xpOther);
                let numberLvlOther = await new Xp().getLvl(xpOther);
                await database.updateLvl(other, numberLvlOther)
            });

            ranking.sort();
            
            others = others.map(user => `<@${user}>`)

            let embed = new Discord.MessageEmbed();
            embed
                .setColor(`#FF4553`)
                .setDescription(`
                🏆 **Podium du ${rush.id_rush}eme Rush** 🏆 

                🪐Jeu rush :** ${ rush.name }**🪐

                Félicitation à tous et à toutes, voici le classement:
                
                <:medailleor:866422605945765919> ** 1e Place :** <@${ ranking[0][1] }> Gagne le titre de <@&${ rush.role_first }> 
                **Score**: ${ ranking[0][2] } 

                <:medailleargent:866422649650151434>** 2e Place :** <@${ ranking[1][1] }> Gagne le titre de <@&${ rush.role_second }>
                **Score** : ${ ranking[1][2] } 

                <:medaillebronze:866422760472707135>** 3e Place :** <@${ ranking[2][1] }> Gagne le titre de <@&${ rush.role_third }>
                **Score** : ${ ranking[2][2] }`)

            const channel = this.client.channels.cache.find(channel => channel.name === '🏆podium');
            await channel.send(embed);
            //msg.say(embed)

            let count = 3;
            
            for (let i = 0; i < (ranking.length - 3)/3; i++) {

                let displaySecond = '';
                let displayThird = '';

                if(ranking[count + 1] !== undefined){
                    displaySecond = `<:achievement:906576693228105759> **${count + 2}e Place :** <@${ ranking[count + 1][1] }> **Score** : ${ ranking[count + 1][2] }`;
                }

                if(ranking[count + 2] !== undefined){
                    displayThird = `<:achievement:906576693228105759> **${count + 3}e Place :** <@${ ranking[count + 2][1] }> **Score** : ${ ranking[count + 2][2] }`;
                }
                

                let embedTest = new Discord.MessageEmbed();
                embedTest
                    .setColor(`#FF4553`)
                    .setDescription(`
                    
                    <:achievement:906576693228105759> **${count + 1}e Place :** <@${ ranking[count][1] }> **Score** : ${ ranking[count][2] }
                    
                    ${displaySecond}
                    
                    ${displayThird}`)
    
                const channel1 = this.client.channels.cache.find(channel => channel.name === '🏆podium');
                await channel1.send(embedTest);
                //msg.say(embedTest)

                count = count + 3;
                
            }


            
        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !podium -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }
};