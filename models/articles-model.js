//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function selectArticle(article_id) {
   return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
     .then(({ rows }) => {
       if (rows.length === 0) {
         next(err);
       }
        return rows;
  });
}

//EXPORTS
module.exports = { selectArticle };
