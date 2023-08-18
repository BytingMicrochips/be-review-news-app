//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function selectArticle(article_id) {
   return db
     .query(
       `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
       [article_id]
     )
     .then(({ rows }) => {
       if (rows.length === 0) {
         return Promise.reject({ status: 404 });
       }
       return rows[0];
     });
}

//EXPORTS
module.exports = { selectArticle };
