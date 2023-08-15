//REQUIRES
const db = require("../db/connection.js");
const { articleExists } = require("./article-exists-model.js");

//FUNCTION
function selectArticle(article_id) {
  const promises = [
    articleExists(article_id),
    db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]),
  ];

  return Promise.all(promises).then((article) => {
    if (Object.keys(article[1].rows[0]).length !== 0) {
      //   return article[1].rows[0];
      return {};
    } else {
      return Promise.reject();
    }
  });
}

//EXPORTS
module.exports = { selectArticle };
