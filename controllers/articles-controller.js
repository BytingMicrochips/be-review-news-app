// REQUIRES
const { selectArticle } = require("../models/articles-model");

// FUNCTION
function getArticles(req, res, next) {
  selectArticle(req.params.article_id)
    .then((rows) => {
      res.status(200).send({ article: rows});
    })
    .catch((err) => {
      next(err)
    });
}

// EXPORTS
module.exports = { getArticles };