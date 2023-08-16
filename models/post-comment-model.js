//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function newComment(article_id, postingComment) {
    let dateObj = new Date();
    if (!postingComment.body) {
        return Promise.reject({
            status: 400,
            msg: `Nothing to post!`
        })
    }
    if (!postingComment.username) {
        return Promise.reject({
            status: 400,
            msg: `No anonymous posting allowed, please log in`,
      });
    }
    if (Object.keys(postingComment).length !==2) {
        return Promise.reject({
            status: 400,
            msg: `Invalid comment posting request`,
        });
    } 
        return db
            .query(
               `INSERT INTO comments (votes, created_at, author, body, article_id) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;`,
                [
                    0,
                    dateObj.toLocaleString(),
                    postingComment.username,
                    postingComment.body,
                    article_id,
                ]
            )
            .then(({ rows }) => {
                return rows[0];
            })     
}
//EXPORTS
module.exports = {newComment}