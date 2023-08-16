// REQUIRES
const { selectArticle } = require("../models/articles-model");

// FUNCTION
function getArticles(req, res, next) {
  selectArticle(req.params.article_id)
    .then((rows) => {
      res.status(200).send({ article: rows[0]});
    })
    .catch((err) => {
      next(err)
    });
}

// EXPORTS
module.exports = { getArticles };


//  const numberOnlyRegex = /^[0-9]*$/