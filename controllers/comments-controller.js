//REQUIRES
const { selectComments } = require("../models/comments-model");

//FUNCTION
function getComments(req, res, next) {
  selectComments(req.params.article_id)
      .then((comments) => {
      res.status(200).send(comments);
    })
      .catch((err) => {
      next(err);
    });
}


//EXPORTS
module.exports = {getComments};
