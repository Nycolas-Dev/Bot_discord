const mTxServCommand = require('../../app/MtxServCommand.js');
const Discord = require('discord.js');

module.exports = class PollCommand extends mTxServCommand {
    constructor(client) {
        super(client, {
            name: 'sondage',
            group: 'divers',
            memberName: 'sondage',
            description: 'Créer un sondage avec 10 choix max',
            examples: ["!sondage \"Quel est ton plat préféré ?\" \"Hot Dogs,Pizza,Burgers,Fruits,Légumes\" 10"],
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            throttling: {
                    usages: 1,
                    duration: 10,
            },
            hidden: true,
            guarded: true,
            args: [
                {
                    key: 'question',
                    prompt: 'Quelle est la question du sondage ?',
                    type: 'string',
                    validate: question => {
                        if (question.length < 101 && question.length > 11) return true;
                        return 'La question du sondage doit contenir entre 10 et 100 caractères.';
                    }
                },
                {
                    key: 'options',
                    prompt: 'Quelle options vous souhaitez pour le sondage ? ',
                    type: 'string',
                    validate: options => {
                        var optionsList = options.split(",");
                        if (optionsList.length > 1) return true;
                        return `Vous devez entrer plus d'une option`;
                    }
                },
                {
                    key: 'time',
                    prompt: 'Combien de temps doit durer le sondage (en minute) ?',
                    type: 'integer',
                    validate: time => {
                        if (time >= 0 && time <= 5760) return true;
                        return 'Le sondage doit être entre 0 and 2880 (4j).';
                    }
                },
            ]
        });
    }

    run(msg, { question, options, time }) {

        try {
            
            var emojiList = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'];
            var optionsList = options.split(",");
    
            var optionsText = "";
            for (let i = 0; i < optionsList.length; i++) {
                optionsText += emojiList[i] + " " + optionsList[i] + "\n";
            }
    
            var embed = new Discord.MessageEmbed()
                .setTitle(question)
                .setDescription(optionsText)
                .setColor('#900C3F') // Green: 0x00AE86
                .setTimestamp();
    
            if (time) {
                embed.setFooter(`Le sondage se termine dans ${time} minute(s)`);
            } else {
                embed.setFooter(`Le sondage a commencé et n'a pas de limite de fin`);
            }

            const channel = this.client.channels.cache.find(channel => channel.name === '❔sondages');
    
           //msg.delete(); // Remove the user's command message
    
            channel.send({embed}) // Definitely use a 2d array here..
                .then(async function (message) {
                    var reactionArray = [];
                    for (let i = 0; i < optionsList.length; i++) {
                        reactionArray[i] = await message.react(emojiList[i]);
                    }
    
                    if (time) {
                        setTimeout(() => {
                            // Re-fetch the message and get reaction counts
                            message.channel.messages.fetch(message.id)
                                .then(async function (message) {
                                    var reactionCountsArray = [];
                                    for (let i = 0; i < optionsList.length; i++) {
                                        reactionCountsArray[i] = message.reactions.cache.get(emojiList[i]).count-1;
                                    }
    
                                    // Find winner(s)
                                    var max = -Infinity, indexMax = [];
                                    for(let i = 0; i < reactionCountsArray.length; ++i)
                                        if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                                        else if(reactionCountsArray[i] === max) indexMax.push(i);
    
                                    // Display winner(s)
                                    var winnersText = "";
                                    if (reactionCountsArray[indexMax[0]] == 0) {
                                        winnersText = "Personne n'a voté !"
                                    } else {
                                        for (let i = 0; i < indexMax.length; i++) {
                                            winnersText +=
                                                emojiList[indexMax[i]] + " " + optionsList[indexMax[i]] +
                                                " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                                        }
                                    }
    
                                    embed.setColor('GREEN')
                                    embed.addField("**Vainqueur:**", winnersText);
                                    embed.setFooter(`Le sondage est maintenant fermé ! Il a duré ${time} minute(s)`);
                                    embed.setTimestamp();
    
                                    message.edit("", embed);
                                });
                        }, time * 60 * 1000);
                    }
                }).catch(console.error);
    
            return;

        } catch (error) {
            this.client.logger.log('error', `Erreur commande : !sondage -> ${msg.author.username} : ${error}`);
            msg.say(`Une erreur est survenue, regarder les logs pour plus d'info.`)
        }
    }
};