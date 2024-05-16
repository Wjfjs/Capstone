const database = require('../database.js');

async function _Login(id, pw){
    
    const query = 'SELECT COUNT(*) as count FROM users WHERE id = ? AND pw = ?';
    const values = [id, pw];

    const result = await database.Query(query, values);
    const user_id = result[0].count;

    if (result instanceof Error) {
        return;
    }
    const user_type = await User_Type_Check(id);
    const arr = [user_id, user_type];
    console.log(arr);
    return arr;
}
async function User_Type_Check(user_id){
    const query = `SELECT user_type FROM users WHERE id = ?`;
    try{

        const result = await database.Query(query, user_id);

        return result[0].user_type;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    Login: _Login
};
