const express = require('express');
const database = require('./database.js');
const script = require('./HTML/script.js');




async function Get_Post(post_id){
    const query = `SELECT ColorTime from TrafficLight where TraffID <= 3`;

    const result = await database.Query(query, null);

    if (result instanceof Error) {
        return;
    }
    return result;
}



module.exports = {
    Get_Post : Get_Post
};