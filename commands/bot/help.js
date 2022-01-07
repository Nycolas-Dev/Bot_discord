const { stripIndents, oneLine } = require('common-tags');
const { disambiguation } = require('discord.js-commando/src/util');
const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'bot',
            memberName: 'help',
            aliases: ['h'],
            description: 'Affiche la liste des commandes disponibles.',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    key: 'command',
                    prompt: 'Pour quelle commande voulez-vous de l\'aide ?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {

        try {

            const groups = this.client.registry.groups;
            const commands = this.client.registry.findCommands(args.command, false, msg);
            const showAll = args.command && args.command.toLowerCase() === 'all';
    
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE');
    
            if(args.command && !showAll) {
                if(commands.length === 1) {
                    let help = stripIndents`
                        ${oneLine`
                            ${commands[0].description}
                            ${commands[0].nsfw ? ' (NSFW)' : ''}
                        `}
                    `;
    
                    if(commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`;
        
                    if(commands[0].details) help += `\n**Detail:** ${commands[0].details}`;
                    if(commands[0].examples) help += `\n**Exemple:**\n${commands[0].examples.join('\n')}`;
    
                    embed
                        .setAuthor(commands[0].name.toUpperCase())
                        .setDescription(help.replace(/ or /g, ' ou '))
                } else if(commands.length > 15) {
                    embed.setDescription('Plusieurs commandes peuvent correspondrent, merci d\'être plus précis.')
                } else if(commands.length > 1) {
                    embed.setDescription(disambiguation(commands, 'commands').replace(/ or /g, ' ou '))
                } else {
                    embed.setDescription(`Cette commande n'existe pas. Utilisez ${msg.usage(
                        null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
                    )} pour voir la liste de toutes les commandes`.replace(/ or /g, ' ou '))
                }
            } else {
                embed
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(`${this.client.user.username}, pour vous servir.`, `${this.client.user.displayAvatarURL()}`)
                    .setDescription(
                        stripIndents`
                        🌀 **Mobile Rush Help** 🌀
    
                        Utilisez \`!help <commande>\` pour voir les informations détaillées de la commande spécifiée.
    
                        **Commandes disponibles :**
    
                        ${groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && cmd.isUsable(msg)))
                            .map(grp => stripIndents`
                                <:saitamaok:905579407995969547> **${grp.name}** <:saitamaok:905579407995969547>
                                ${grp.commands.filter(cmd => !cmd.hidden && cmd.isUsable(msg))
                                .map(cmd => `\`!${cmd.name}\``).join(' ')
                            }
                            `).join('\n\n')
                        }`.replace(/ or /g, ' ou '))
                ;
            }
    
            return msg.say(embed)
        
        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !help -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }
};