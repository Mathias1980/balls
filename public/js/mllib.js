'use strict';

const mllib = {

    createNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    createColor(sat, light){
        return `hsl(${this.createNumber(0, 360)},${sat}%,${light}%)`
    },

    randomString(length){
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },

    createArray(anzahl, min, max){
        const data = [];
        while(anzahl--){
            data.push(this.createNumber(min, max));
        }
        return data;
    }


}