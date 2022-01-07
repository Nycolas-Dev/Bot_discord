const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'regles',
            memberName: 'regles',
            group: 'divers',
            description: 'Règles du serveur Mobile Rush.',
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
        });
    }
    async run(msg) {
        const embed = new Discord.MessageEmbed(); // création de l'embed
        //const eyes = msg.guild.emojis.cache.find(emoji => emoji.name === "eyes");

        embed
            .setColor(`#FCFF22`) // ou .setColor(`#0099ff`)
            .setTitle(`:scroll: Règlement du serveur :scroll:`)
    
            .setDescription(`Voici le règlement du serveur, veuillez le prendre en compte et l'intégrer à votre expérience sur le discord.\n \n`
            +`:page_with_curl: 1 - Traiter tout le monde avec respect : Aucun harcèlement, troll/taunt virulent, sexisme, racisme ou discours de haine ne sera toléré.\n \n`
            +`:page_with_curl: 2 - Pas de contenu violent, obscène ou NSFW qu'il s'agisse d'un texte, image ou lien mettant en scène de la nudité, du sexe, de violence ou un quelconque contenu dérangeant.\n \n`
            +`:page_with_curl: 3 - Pas de spam dans les channels.\n \n`
            +`:page_with_curl: 4 - Les publicités en tout genre ne sont pas autorisées sur le serveur.\n \n`
            +`:page_with_curl: 5 - Veuillez utiliser les bons salons textuels pour ne pas voir vos messages supprimés par les modérateurs.\n \n`
            +`*En cas de non respect des règles, <@817169336074371072> appliquera des sanctions plus ou moins lourdes.*`)

        ;
    
        const channel = this.client.channels.cache.find(channel => channel.name === '📄règles');
        await channel.send(embed);
    };
}