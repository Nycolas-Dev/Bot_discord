const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = class Time { 

    async formatDate(date){
        return date.replace(/(\d+)\/(\d+)\/(\d+)/,"$3-$2-$1");
    }

    async getDurationInHours(dateStart, dateEnd) {
        const diffInHr = Math.abs(dateStart - dateEnd);
        return diffInHr / (1000 * 60 * 60);
    }

    async getDurationInMs(dateStart, dateEnd) {
        const diffInMs = Math.abs(dateStart - dateEnd);
        return diffInMs;
    }

    async splitTime(numberOfHours){
        var Days=Math.floor(numberOfHours/24);
        var Remainder=numberOfHours % 24;
        var Hours=Math.floor(Remainder);
        var Minutes=Math.floor(60*(Remainder-Hours));
        return({"Days":Days,"Hours":Hours,"Minutes":Minutes})
    }

}