//REQUIRE
const {patchVotes} = require("../models/patch-articles-model");

//FUNCTION
function patchArticles(req, res, next) {
    patchVotes(req.params.article_id, req.body)
      .then((updatedArticle) => {
              res.status(200).send(updatedArticle);
      })
        .catch((err) => {
        next(err);
      });
 }

//EXPORTS
module.exports = {patchArticles}