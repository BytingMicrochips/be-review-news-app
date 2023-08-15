// REQUIRES
const { selectArticle } = require("../models/articles-model");

// FUNCTION
function getArticles(req, res, next) {
  selectArticle(req.params.article_id)
    .then((article) => {
      if (Object.keys(article).length !== 0) {
        res.status(200).send(article);
      } else {
        res.status(200).send({ msg: `We can't seem to find that!` });
      }
    })
    .catch((err) => {
      next(err);
    });
}

// EXPORTS
module.exports = { getArticles };
