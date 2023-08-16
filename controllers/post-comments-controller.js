//REQUIRE
const {newComment} = require("../models/post-comment-model")
//FUNCTION
function postComments(req, res, next) {
  newComment(req.params.article_id, req.body)
      .then((addedComment) => {
      return res.status(201).send(addedComment);
    })
      .catch((err) => {
      next(err);
    });
}
//EXPORTS
module.exports = {postComments}