const db = require('./Connect_DB.js');

async function getCount(){
    
    const query = 'SELECT count FROM count';
    const result = await db.Query(query, null);
	
	if (result instanceof Error) {
		console.error(result);
	}
	return result;
}

module.exports = {
    getCount: getCount
};