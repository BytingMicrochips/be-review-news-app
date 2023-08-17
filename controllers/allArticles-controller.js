// REQUIRE
const {fetchAllArticles} = require("../models/all-articles-model");

// FUNCTION
function getAllArticles(req, res, next) {
    fetchAllArticles()
      .then((returnedArticles) => {
        return res.status(200).send({ articles: returnedArticles });
      })
      .catch((err) => {
        next(err);
      });
}

//EXPORTS
module.exports =  {getAllArticles} ;