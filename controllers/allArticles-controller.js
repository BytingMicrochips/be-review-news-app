// REQUIRE
const fetchAllArticles = require("../models/all-articles-model");

// FUNCTION
function getAllArticles(req, res, next) {
    fetchAllArticles()
      .then((articles) => {
        return res.status(200).send(articles);
      })
      .catch((err) => {
        next(err);
      });
}

//EXPORTS
module.exports = { getAllArticles };