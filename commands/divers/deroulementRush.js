const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'deroulementrush',
            memberName: 'deroulementrush',
            group: 'divers',
            description: 'Déroulements des rush',
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
        });
    }
    async run(msg) {

        //EMBED ETAPE 1
        const embed = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed
            .setColor(`#97D56D`) // ou .setColor(`#0099ff`)
            .setTitle(`:hourglass_flowing_sand: Déroulement d'un rush :hourglass_flowing_sand:`)
    
            .setDescription(`Voici le déroulement classique d'un rush, veuillez contribuer au bon déroulement de celui ci et respectez les étapes et instructions.\n \n`
            +`Sachez avant toute choses qu'un bot discord a été entièrement développé pour assister l'organisation des rush. Vous pourrez découvrir son fonctionnement durant votre aventure sur le serveur. \n \n`
            +`:diamond_shape_with_a_dot_inside: **Etape 1 - Le choix des jeux**\n \n`
            +`Afin de se mettre en accord sur le jeu rushé, plusieurs étapes sont necessaires. Tout d'abord, il faut que les membres du discord proposent des jeux dans le canal `
            +`<#696991132516614145>. *!* ATTENTION *!* Nous ne faisont de rush que sur des jeux peu connus (on se limite généralement aux jeux à moins de 1 million `
            +`de téléchargements) pour éviter que certains aient déja joués au jeu. On veut que tout le monde commence un rush avec la même expérience. Puis, une fois `
            +`les suggestions faites, l’équipe de modération sélectionne 3 de ses suggestions et fait voter pour le jeu qui sera rushé dans le canal <#696991172287135796>.`)

        ;


        //EMBED ETAPE 2
        const embed2 = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed2
            .setColor(`#97D56D`) // ou .setColor(`#0099ff`)
    
            .setDescription(`:diamond_shape_with_a_dot_inside: **Etape 2 - L'inscription a un rush**\n \n`
            +`Si vous êtes interessé par le jeu rushé, notre cher <@817169336074371072> enverra un message dans le canal <#696991770776436766> . Vous devrez alors `
            +`confirmer votre inscription en réagissant avec l'émote :cyclone: et vous recevrez un MP de confirmation avec la date et l'heure du début du rush. `
            +`Le grade de <@&696990674666389504> vous sera attribué tout le long du rush pour montrer que vous serez un participant. Si vous souhaitez vous désinscrire d'un rush, `
            +`vous pouvez enlever votre réaction au message dans le canal <#696991770776436766>.`
            +`Sachez que peu importe votre temps de jeu, expérience ou autre, le but c'est tous de jouer au meme jeu pendant un temps donné. N'ayez craintes, et lancez vous dans l'aventure ;)`)

        ;

        const embed3 = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed3
            .setColor(`#97D56D`) // ou .setColor(`#0099ff`)
    
            .setDescription(`:diamond_shape_with_a_dot_inside: **Etape 3 - Le Rush**\n \n`
            +`Le jeu est maintenant défini et il va commencer sous peu de temps. <@817169336074371072> annoncera le début du rush et SEULEMENT à partir de ce moment la, `
            +`vous pourrez allumer votre jeu, commencer votre progression et RUSHHHHHERRR !!! Une fois en rush, l’équipe de modération défini les grades qui peuvent être obtenus dans le canal <#697015096525979718>.`
            +`Amusez vous durant le rush et n'oubliez pas que cette aventure reste avant tout communautaire. N'hésitez pas a discuter du rush dans le canal <#696991842205696020> ou à partager des petites captures d'écrans dans <#697354528818856016>.`)   
            

        ;

        //EMBED ETAPE 4
        const embed4 = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed4
            .setColor(`#97D56D`) // ou .setColor(`#0099ff`)
    
            .setDescription(`:diamond_shape_with_a_dot_inside: **Etape 4 - La fin du Rush**\n \n`
            +`Le rush va toucher à sa fin. Notre très aimé <@817169336074371072> vous annoncera également quand le rush se terminera. A partir de ce moment la, vous aurez 1h `
            +`pour poster le screen de votre avancée sur le jeu selon l'objectif fixé dans le canal <#699348417998225479>. Si l'heure donnée est dépasée, vous ne pourrez plus envoyer de messages dans le canal et par conséquent `
            +`votre résultat ne sera pas pris en compte. Après dépouillage de la part de la modération, un message sera envoyé dans le canal <#697015096525979718> pour glorifier les vainqueurs du rush ainsi que tous les joueurs ayant participés au rush.`
            +`Une fois terminé, la participation a un rush ou un podium vous fera gagner de l'xp. Nous vous invitons donc à tout de même mettre votre résultat pour monter en niveau de rusher.`)    
            
        ;

        const channel = this.client.channels.cache.find(channel => channel.name === '⏳deroulement-rush');
        await channel.send(embed);
        await channel.send(embed2);
        await channel.send(embed3);
        await channel.send(embed4);

    };

    
}