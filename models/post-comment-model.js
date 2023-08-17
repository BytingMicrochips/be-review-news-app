//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function newComment(article_id, postingComment) {
    if (!postingComment.body) {
        return Promise.reject({
            status: 400,
            msg: `Nothing to post!`
        })
    }
    if (!postingComment.username) {
        return Promise.reject({
          status: 400,
          msg: `Malformed request body, missing username key`,
        });
    }
        return db
            .query(
               `INSERT INTO comments (author, body, article_id) 
                VALUES ($1, $2, $3)
                RETURNING *;`,
                [
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