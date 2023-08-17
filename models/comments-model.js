//REQUIRES
const db = require("../db/connection.js");
const articlesData = require("../db/data/test-data/articles.js")

//FUNCTION
function selectComments(article_id) {
  if (article_id > articlesData.length) {
        return Promise.reject({
          status: 404,
          msg: `article_id ${article_id} does not exist`,
        });
  }
  const onlyDigitsRegex = /(^[0-9]+$)/;
  if (onlyDigitsRegex.test(article_id)) {
    return db
      .query(
        "SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC;",
        [article_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          rows.push("No comments found...");
          return rows;
        } else {
          return rows;
        }
      });
  } else {
    return Promise.reject({
      status: 400,
      msg: `${article_id} is not a valid article_id`})
}
}

//EXPORTS
module.exports = {selectComments}