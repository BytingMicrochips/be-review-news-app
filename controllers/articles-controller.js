// REQUIRES
const { selectArticle } = require("../models/articles-model");

// FUNCTION
function getArticles(req, res, next) {
  selectArticle(req.params.article_id)
    .then((modelReturn) => {
      if (modelReturn.article === undefined) {
        next(err)
      }
        res.status(200).send(modelReturn.article);
    })
    .catch((err) => {
      next(err)
    });
}

// EXPORTS
module.exports = { getArticles };


//  const numberOnlyRegex = /^[0-9]*$/