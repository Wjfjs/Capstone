const express = require('express');
const database = require('./database.js');
const script = require('./HTML/script.js');




async function Get_Post(post_id){
    const query = `SELECT ColorTime 
    FROM TrafficLight
    WHERE (Sequence LIKE '녹%' OR Sequence LIKE '적%' OR Sequence LIKE '황%')
    AND TrafficLightID = 15
    ORDER BY CASE 
        WHEN Sequence LIKE '녹%' THEN 1
        WHEN Sequence LIKE '적%' THEN 2
        WHEN Sequence LIKE '황%' THEN 3
        ELSE 4 END;`;

    const result = await database.Query(query, null);

    if (result instanceof Error) {
        return;
    }
    return result;
}



module.exports = {
    Get_Post : Get_Post
};