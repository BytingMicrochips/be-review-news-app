//REQUIRES
const { selectComments } = require("../models/comments-model");

//FUNCTION
function getComments(req, res, next) {
  selectComments(req.params.article_id)
    .then((fetchedComments) => {
      res.status(200).send({ comments: fetchedComments });
    })
    .catch((err) => {
      next(err);
    });
}


//EXPORTS
module.exports = {getComments};
