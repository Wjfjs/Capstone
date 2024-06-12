const database = require('./database.js');

async function User_Insert(logdate, settime){
    
    const query = 'INSERT INTO log(logdate, settime) VALUES (?, ?)';
    const values = [now(), settime];

    const result = await database.Query(query, values);

    if (result instanceof Error) {
        return;
    }
}

module.exports = {
    Add_User: User_Insert
};