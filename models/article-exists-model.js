//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function articleExists(article_id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject();
      }
    });
}

//EXPORTS
module.exports = { articleExists };
