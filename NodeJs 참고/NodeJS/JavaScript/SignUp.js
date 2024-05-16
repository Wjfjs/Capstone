const database = require('../database.js');

async function User_Insert(id, pw, nick_name){
    
    const query = 'INSERT INTO users(id, pw, nick_name) VALUES (?, ?, ?)';
    const values = [id, pw, nick_name];

    const result = await database.Query(query, values);

    if (result instanceof Error) {
        return;
    }
}

module.exports = {
    Add_User: User_Insert
};