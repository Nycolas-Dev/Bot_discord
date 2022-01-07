const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Bdd = require('../../app/Bdd.js');
const Xp = require('../../app/Xp.js');
const { info } = require('winston');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			memberName: 'info',
			group: 'players',
			description: `Affiche les infos d'un joueur.`,
            guildOnly: true,
            throttling: {
                    usages: 2,
                    duration: 10,
            },
			// args: [
            //     {
			// 		key: 'player',
			// 		prompt: 'De qui voulez vous des infos ?',
			// 		type: 'string',
            //     },
            // ],
		});
	}

	async run(msg) {

			try {
				
			//Initialisation de la variable player
			let player;

			//Condition : 
			//Si le message = !info --> envoi dans player le pseudo de l'auteur de la commande
			//Sinon, envoi l'argument (!info argument) dans player
			if (msg.content === "!info") {
				player = msg.author.id;
			}
			else { 
				player = msg.content.replace('!info ', "")
				let searchPlayer = this.client.users.cache.find(user => user.username === player)
				if(searchPlayer !== undefined) {
					player = searchPlayer.id 
				}
			}


			//Recherche sur discord.js de l'objet correspondant au pseudo donné
			let playerDis = this.client.users.cache.find(user => user.id === player);

			if (playerDis == undefined) {
				player = player.replace('<@!', "");
				player = player.replace('>', "");
				console.log(player)
			}

			playerDis = this.client.users.cache.find(user => user.id === player);

			//Si playerDis est vide (n'existe pas sur discord), message d'erreur
			if (playerDis == undefined) {
				msg.say(`${ player } n'existe pas sur Mobile Rush.`)
			}
			//Si playerDis est "Lord of Rush", message sympa
			else if (playerDis.id === '817169336074371072') {
				msg.say(`Tu ne peux pas connaître mes informations, je suis le grand et vénérable <@817169336074371072>, agenouille-toi devant ma suprématie.`)
			}
			else {

			console.log(player);

			let pseudo = await database.getPseudo(player);
			let description = await database.getDescription(player);
			
			if (description === undefined | description === null | description === "") {
				description = "Vous n'avez pas encore de description, créez en une avec !addBio !"
			}
	
			let rushPlayed = await database.getRushPlayed(player);
			let rushFirst = await database.getRushPlace(player, 1);
			let rushSecond = await database.getRushPlace(player, 2);
			let rushThird = await database.getRushPlace(player, 3);

			let role = await database.getRole(player);

			let roleName = [];
			if(role.length === 0) {
				roleName.push(`Vous n'avez pas encore gagné de rôle !`);
			}
			else { 
				role.forEach((role) => {
					roleName.push(role.roles_id_role);
				})
				roleName = roleName.map( role => `<@&${role}>`) 
			}

			
			let playerLvl = await database.getLvl(player);
			let playerXp = await database.getXp(player);
			let xpMin = await new Xp().getInfo(playerLvl - 1);
			if(isNaN(xpMin)){
				xpMin = 0;
			}
			let xpMax = await new Xp().getInfo(playerLvl);
			let interval = xpMax - xpMin;
			let xpPlayerInterval = playerXp - xpMin;
			let pourcentage = xpPlayerInterval * 100 / interval / 100;
			let numberOfEmoji;
			let numberOfNonEmoji;
			let fieldXp;

				//Gestion device
				const user = msg.author;
				const devices = user.presence?.clientStatus;
		
				let tabDevices = Object.keys(devices);
		
				if(tabDevices.find( device => device === 'desktop') === "desktop" && tabDevices.find( device => device === 'mobile') === "mobile"){
					numberOfEmoji = pourcentage * 20;
					numberOfNonEmoji = 20 - numberOfEmoji;
					fieldXp = `Xp : \u200b                                                                                Lvl ${playerLvl}  |  ${xpPlayerInterval}/${interval} xp`
				}
				else if(tabDevices.find( device => device === 'desktop') === "desktop") {
					numberOfEmoji = pourcentage * 20;
					numberOfNonEmoji = 20 - numberOfEmoji;
					fieldXp = `Xp : \u200b                                                                                Lvl ${playerLvl}  |  ${xpPlayerInterval}/${interval} xp`
				}
				else if(tabDevices.find( device => device === 'mobile') === "mobile") {
					numberOfEmoji = pourcentage * 14;
					numberOfNonEmoji = 14 - numberOfEmoji;
					fieldXp = `Xp : \u200b                                  Lvl ${playerLvl}  |  ${xpPlayerInterval}/${interval} xp`
				}
				else {
					numberOfEmoji = pourcentage * 20;
					numberOfNonEmoji = 20 - numberOfEmoji;
					fieldXp = `Xp : \u200b                                                                                Lvl ${playerLvl}  |  ${xpPlayerInterval}/${interval} xp`
				}

			console.log(xpPlayerInterval)

			let displayXp = [];
			if(xpPlayerInterval === 0){
				displayXp.push('<:xp4:881828347691270174>')
			}
			if(xpPlayerInterval === 1){
				displayXp.push('<:xp7:881828347624181761>')
			}
			if(xpPlayerInterval > 1){
				displayXp.push('<:xp:881828347649359882>')
				for (let i = 0; i < numberOfEmoji - 2; i++) {
					displayXp.push('<:xp2:881828347661930507>');
				}
			}
			if(xpPlayerInterval > 1){
				displayXp.push('<:xp3:881828347716468756>')
			}
			for (let i = 0; i < numberOfNonEmoji - 1; i++) {
				displayXp.push('<:xp5:881828347448033342>');
			}

			displayXp.push('<:xp6:881829910140842004>');

			const embed = new Discord.MessageEmbed();



			embed
				.setAuthor(`Infos de ${pseudo}`, playerDis.avatarURL())
				.setDescription(`**Bienvenue** sur le profil de <@${playerDis.id}>, vous retrouvez ici toutes les informations à savoir sur ce rusher !`)
				.setThumbnail(playerDis.avatarURL())
				.setColor('#54ADA8')
				.addField(`<:description:881328138410414121> Description :`, `${description}`)
				.addField(`Nombre de rush gagnés : `, `>  <:medailleor:866422605945765919> 1er : ${rushFirst} \n > <:medailleargent:866422649650151434> 2ème : ${rushSecond} \n > <:medaillebronze:866422760472707135>  3ème : ${rushThird}`, true)
				.addField(`Nombre de rush joués : `, `> \n > ${rushPlayed} rush \n > \u200b `, true)
				// .addField(`Barre d'XP 1: `, `| ${xp.join('')} |`)
				.addField(fieldXp, `\u200b${displayXp.join('')}\u200b`)
				.addField(`Liste des rôles : `, roleName.join(' | '))
				.setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`)
			msg.say(embed);
		}

			} catch (error) {
				this.client.logger.log('error', `Erreur commande : !info -> ${msg.author.username} : ${error}`);
				msg.say(`Une erreur est survenue, <@343469541000609794> est prévenu, si il est disponible il viendra vous aider.`)
			}

	}
};