const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

/**
 * @class
 * @classdesc Contient les méthodes pour interagir avec la base de données
 */
module.exports = class Bdd { 

    constructor() {
        //Récupère les infos contenu dans le .env
        const envConfig = dotenv.parse(fs.readFileSync('.env'))
        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }

        const database = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database : process.env.DATABASE
            });
        
        database.connect(function(err) {
            if (err) throw err;
        })

        this.database = database;
      }

    // /**
    //  * Connection à la base de données
    //  * @return database
    //  */
    // async connect() {
        

    // }

    async getPseudo(id) {

        let sql = `SELECT pseudo FROM players WHERE id_discord = ${id}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0].pseudo;
                resolve(analise);
            });
        });
    }

    async getId(pseudo) {

        let sql = `SELECT id_discord FROM players WHERE pseudo = ${pseudo}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                console.log(result)
                console.log(result[0].id_discord)
                const analise = result[0].id_discord;
                resolve(analise);
            });
        });
    }

    async getDescription(id) {

        let sql = `SELECT description FROM players WHERE id_discord = ${id}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0].description;
                resolve(analise);
            });
        });
    }

    async getRushPlayed(id) {

        let sql = `SELECT COUNT(*) FROM rush_has_players WHERE players_id_discord = ${id}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const [analise] = Object.values(result[0]);
                resolve(analise);
            });
        });
    }

    async getRushPlace(id, place) {

        let sql = `SELECT COUNT(*) FROM result WHERE players_id_discord = ${id} AND place = ${place}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const [analise] = Object.values(result[0]);
                resolve(analise);
            });
        });
    }

    
    async getRole(id) {

        let sql = `SELECT roles_id_role FROM players_has_roles WHERE players_id_discord = ${id}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }
    
    async addBio(id, value) {

        let sql = `UPDATE players SET description = '${value}' WHERE id_discord = '${id}'`;

            return new Promise(resolve => {
                this.database.query(sql, function(error, result) {
                    if (error) return error;
                    const analise = result.affectedRows;
                    resolve(analise);
                });
            });
           
    }

        
    async addPlayer(id, pseudo) {

        let sql = `INSERT INTO players VALUES ( '${id}' , '${pseudo}', '', '0', '0')`;

        this.database.query(sql, function(error, result) {
                if (error) return error;
                console.log(result.affectedRows);
            });
    }

    async getRushInRun() {

        let sql = `SELECT id_rush, name, date_start, hour_start, date_end, hour_end FROM rush WHERE etat_id_etat = 2`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0];
                resolve(analise);
            });
        });
    }

    async getRushNotStart() {

        let sql = `SELECT id_rush, name, date_start, hour_start, date_end, hour_end FROM rush WHERE etat_id_etat = 1`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0];
                resolve(analise);
            });
        });
    }

    async getRush(idRush) {

        let sql = `SELECT id_rush, name, date_start, hour_start, date_end, hour_end, etat_id_etat, role_first, role_second, role_third FROM rush WHERE id_rush = ${idRush}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0];
                resolve(analise);
            });
        });
    }

    async getAllRush() {

        let sql = `SELECT id_rush, name, date_start, hour_start, date_end, hour_end, etat_id_etat FROM rush`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }

    async getParticipants(rushId) {

        let sql = `SELECT players_id_discord FROM rush_has_players WHERE rush_id_rush = ${rushId}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }

    async getRoleRushInRun(rushId) {

        let sql = `SELECT role_first, role_second, role_third FROM rush WHERE id_rush = ${rushId}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0];
                resolve(analise);
            });
        });
    }

    async addResult(idPlayer, idRush, score, place) {

        let sql = `INSERT INTO result VALUES ('0','${place}', '${score}', '${idPlayer}', '${idRush}')`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
        
    }

    async getResult(rushId) {

        let sql = `SELECT place, score, players_id_discord FROM result WHERE rush_id_rush = ${rushId}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }

    async addPlayerRush(idRush, idPlayer) {

        let sql = `INSERT INTO rush_has_players VALUES ('${idRush}', '${idPlayer}')`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async removePlayerRush(idRush, idPlayer) {

        let sql = `DELETE FROM rush_has_players WHERE rush_id_rush = ${idRush} AND players_id_discord = ${idPlayer}`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async addRoleRush(idRush, firstRole, secondRole, thirdRole) {

        let sql = `UPDATE rush SET role_first = '${firstRole}', role_second = '${secondRole}', role_third = '${thirdRole}' WHERE id_rush = '${idRush}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async addRoleBdd(role) {

        let sql = `INSERT INTO roles VALUES ('${role}', '')`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async removeForeignKeyCheck() {

        let sql = `SET FOREIGN_KEY_CHECKS=0;`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async addRush(nameRush, dateStart, hourStart, dateEnd, hourEnd) {

        let sql = `INSERT INTO rush VALUES ('0','${nameRush}', '${dateStart}', '${hourStart}', '${dateEnd}', '${hourEnd}', '1', null, null, null)`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async updateEtat(idRush, etat) {

        let sql = `UPDATE rush SET etat_id_etat = '${etat}' WHERE id_rush = '${idRush}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async updateDateStart(idRush, date, hour) {

        let sql = `UPDATE rush SET date_start = '${date}', hour_start = '${hour}' WHERE id_rush = '${idRush}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async updateDateEnd(idRush, date, hour) {

        let sql = `UPDATE rush SET date_end = '${date}', hour_end = '${hour}' WHERE id_rush = '${idRush}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async updateXp(idPlayer, numberXp) {

        let sql = `UPDATE players SET xp = '${numberXp}' WHERE id_discord = '${idPlayer}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async getXp(idPlayer) {

        let sql = `SELECT xp FROM players WHERE id_discord = '${idPlayer}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0].xp;
                resolve(analise);
            });
        });
    }

    async getLvl(idPlayer) {

        let sql = `SELECT lvl FROM players WHERE id_discord = '${idPlayer}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result[0].lvl;
                resolve(analise);
            });
        });
    }

    async updateLvl(idPlayer, numberLvl) {

        let sql = `UPDATE players SET lvl = '${numberLvl}' WHERE id_discord = '${idPlayer}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async addSuggest(name, link) {

        let sql = `INSERT INTO games VALUES ('0','${name}', '${link}')`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async getSuggest() {

        let sql = `SELECT name, link FROM games`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }

    async updatePseudo(idPlayer, pseudo) {

        let sql = `UPDATE players SET pseudo = '${pseudo}' WHERE id_discord = '${idPlayer}'`;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result) {
                if (error) return error;
                const analise = result.affectedRows;
                resolve(analise);
            });
        });
    }

    async getTopThreeLvl() {

        let sql = `SELECT id_discord, lvl FROM players ORDER BY lvl DESC LIMIT 10; `;

        return new Promise(resolve => {
            this.database.query(sql, function(error, result, fields) {
                if (error) return error;
                const analise = result;
                resolve(analise);
            });
        });
    }

}