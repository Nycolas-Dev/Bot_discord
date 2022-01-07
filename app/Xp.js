const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
const Bdd = require('../app/Bdd.js');

module.exports = class Xp { 

    constructor() {

        this.tabXp = [
            5,10,15,20,25,                                          //5 de 5
            31,37,43,49,55,61,                                      //6 de 6
            68,75,82,89,96,103,110,                                 //7 de 7
            118,126,134,142,150,158,166,174,                        //8 de 8
            183,192,201,210,219,228,237,246,255,                    //9 de 9
            265,275,285,295,305,315,325,335,345,355,                //10 de 10
            367,379,391,403,415,427,439,451,463,475,                //10 de 12
            489,503,517,531,545,559,573,587,601,615,                //10 de 14
            631,647,663,679,695,711,727,743,759,775,                //10 de 16
            793,811,829,847,865,883,901,919,937,955,                //10 de 18
            975,995,1015,1035,1055,1075,1095,1115,1135,1155,        //10 de 20
            1180,1205,1230,1255,1280,1305,1330,1355,1380,1405,      //10 de 25
            1435,1465,1495,1525,1555,1585,1615,1645,1675,1705
        ]
        
        // this.tabXp = [
        //     5,
        //     10,
        //     15,
        //     20,
        //     25,
        //     35,
        //     45,
        //     55,
        //     65,
        //     75,
        //     85,
        //     95,
        //     105,
        //     115,
        //     125,
        //     135,
        //     145,
        //     155,
        //     165,
        //     175,
        //     190,
        //     205,
        //     220,
        //     235,
        //     250,
        //     265,
        //     280,
        //     295,
        //     310,
        //     325,
        //     345,
        //     365,
        //     385,
        //     405,
        //     425,
        //     445,
        //     465,
        //     485,
        //     505,
        //     525,
        //     545,
        //     565,
        //     585,
        //     605,
        //     625,
        //     655,
        //     685,
        //     715,
        //     745,
        //     775,
        // ]

      }

    async getTabXp(){
        return this.tabXp;
    }

    async getLvl(numberXp){
        
        let tab = this.tabXp;

        const found = tab.findIndex(element => element > numberXp);

        return found;

    }

    async getInfo(index){
        
        let tab = this.tabXp;


        return tab[index];

    }

    // async test(idPlayer, database) {

        

    //     let info = await new Bdd().getInfoForXp(idPlayer, database);
    //     console.log(info);

    //     for (const data of info) {
    //         let lvl = data.lvl;
    //         let xp = data.xp;
    //         let target_xp = data.target_xp;
    //     }

        // if(numberXp < targetXp){
        //     console.log(numberXp);
        // }
        // else if(numberXp === targetXp){
        //     lvl++;
        //     numberXp = 0;
        // }
        // else if(numberXp > targetXp){
            
        // }
    // }

}