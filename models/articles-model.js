//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function selectArticle(article_id) {
   return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
      .then((article) => {
        return { article: article.rows[0] };
  });
}

//EXPORTS
module.exports = { selectArticle };
