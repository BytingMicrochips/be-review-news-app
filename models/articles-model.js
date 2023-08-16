//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function selectArticle(article_id) {
   return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
     .then(({ rows }) => {
       console.log(rows)
       if (rows.length === 0) {
         Promise.reject(err);
       }
        return rows[0];
  });
}

//EXPORTS
module.exports = { selectArticle };
