const database = require('../database.js');

async function Get_Post_List(){
    
    const query = `SELECT post_id, title, CONCAT(nick_name, '(', SUBSTRING(id, 1, 5), '***', ')') as author_id, DATE_FORMAT(added, '%Y-%m-%d %H:%i:%s') as date, view_count, board_type, user_type, lock_bool
                    FROM posts
                    JOIN users
                    ON posts.author_id = users.id`;

    const result = await database.Query(query, null);

    if (result instanceof Error) {
        return;
    }

    return result;
}
async function Get_Post(post_id){
    const query = `SELECT title, author_id, DATE_FORMAT(added, \'%Y-%m-%d %H:%i:%s\') as date, view_count, board_type, content, user_type, lock_bool
                    FROM posts 
                    JOIN users
                    ON posts.author_id = users.id
                    WHERE post_id = ${post_id}`;

    const result = await database.Query(query, null);

    if (result instanceof Error) {
        return;
    }
    return result;
}
async function Add_View_Count(post_id){
    const query = `UPDATE posts SET view_count = view_count + 1 WHERE post_id = ?`;

    const result = await database.Query(query, post_id);

    if (result instanceof Error) {
        return;
    } 
}
async function Add_Post(board_type, title, content, user_id, lock_state){
    const query = `INSERT INTO posts(title, author_id, board_type, content, lock_bool) VALUES (?, ?, ?, ?, ?)`;

    const values = [title, user_id, board_type, content, lock_state];

    result = await database.Query(query, values);
    

    if (result instanceof Error) {
        return;
    } 
}
async function Lock_Post_Check(post_id, user_id){
    const query_1 = `SELECT COUNT(*) as count
                    FROM posts
                    JOIN users
                    ON posts.author_id = users.id
                    WHERE post_id = ? AND author_id = ?`;

    const query_2 = `SELECT user_type FROM users WHERE id = ?`;
    const values = [post_id, user_id];

    result_1 = await database.Query(query_1, values);
    result_2 = await database.Query(query_2, user_id);
    if (result_1 instanceof Error) {
        return;
    }
    if (result_2 instanceof Error) {
        return;
    }
    if(result_1[0].count == 1 || result_2[0].user_type === 'admin'){
        return 'true';
    }
    else{
        return 'false';
    }
}
// 게시글 수정
async function Update_Post(title, content, post_id){
    const query = `UPDATE posts SET title = ?, content = ? WHERE post_id = ?`;

    const values = [title, content, post_id];

    result = await database.Query(query, values);

    if(result instanceof Error){
        return;
    }
}
// 게시글 삭제
async function delete_post(post_id) {
	const query = `DELETE FROM posts
				  WHERE post_id = ?`;
	console.log(post_id);
	const values = [post_id];
	
	const result = await database.Query(query, values);
	
	if (result instanceof Error) {
		console.error(result);
	}
}
async function Selected_Posts_Delete(posts_id){
    let query = `DELETE FROM posts WHERE post_id IN `;
    query += '(';
    for(let i = 0; i < posts_id.length; i++){
        query += '?'
        if(i !== posts_id.length - 1){
            query += ', ';
        }
    }
    query += ')';

    const result = await database.Query(query, posts_id);

    if(result instanceof Error){
        console.error(result);
    }
}
// 모든 유저 가져옴
async function get_users() {
	const query = `SELECT id, nick_name, user_type 
				  FROM users`;
	
	const result = await database.Query(query, null);
	
	if (result instanceof Error) {
		console.error(result);
	}
	return result;
}
// 유저삭제
async function delete_users(id, nick_name) {
	const query = `DELETE FROM users
				  WHERE id = ? AND nick_name = ?`;
				  
	const values = [id, nick_name];
	
	const result = await database.Query(query, values);
	
	if (result instanceof Error) {
		console.error(result);
	}
}
async function Search_Posts(col, search_content, board_type){
    const query = `SELECT post_id, title, CONCAT(nick_name, '(', SUBSTRING(id, 1, 5), '***', ')') as author_id, DATE_FORMAT(added, '%Y-%m-%d %H:%i:%s') as date, view_count, board_type, user_type, lock_bool
                    FROM posts 
                    JOIN users
                    ON posts.author_id = users.id
                    WHERE board_type = ? AND ${col} LIKE ?`;
    const values = [board_type, `%${search_content}%`]
    console.log(values);
    const result = await database.Query(query, values);
    console.log(result);
    if (result instanceof Error) {
        return;
    }
    return result;
}
//댓글 불러오기
async function load_comments(post_id) {
	const query = `SELECT c.comment_id, c.post_id, c.comment, c.author_id, DATE_FORMAT(c.date, \'%Y-%m-%d %H:%i:%s\') as date, CONCAT(u.nick_name, '(', SUBSTRING(id, 1, 5), '***', ')') as nick_name
				  FROM comments as c
				  JOIN users as u
				  ON c.author_id = u.id
				  WHERE c.post_id = ?`;
	
	const result = await database.Query(query, post_id);
	
	if (result instanceof Error) {
		console.error(result);
	}
	return result;
}
//댓글 추가
async function add_comment(comment, post_id, id) {
	const query = `INSERT INTO comments (comment, post_id, author_id)
				  VALUES(? ,?, ?)`;
				  
	const values = [comment, post_id, id];
	
	const result = await database.Query(query, values);
	
	if (result instanceof Error) {
		console.error(result);
	}
	return result;
}
//댓글 삭제
async function delete_comment(comment_id) {
	const query = `DELETE FROM comments
				  WHERE comment_id = ?`;
	
	const values = [comment_id];
	
	const result = await database.Query(query, values);
	
	if (result instanceof Error) {
		console.error(result);
	}
}

module.exports = {
    Get_List: Get_Post_List,
    Get_Post: Get_Post,
    Add_View_Count: Add_View_Count,
    Add_Post: Add_Post,
    Lock_Check: Lock_Post_Check,
    Update_Post: Update_Post,
	delete_post: delete_post,
	Posts_Delete: Selected_Posts_Delete,
	get_users: get_users,
	delete_users: delete_users,
	Search: Search_Posts,
	load_comments: load_comments,
	add_comment: add_comment,
	delete_comment: delete_comment
};
