//REQUIRE
const { patchCommentVotes } = require("../models/patch-comment-model");

//FUNCTION
function patchComments(req, res, next) {
  patchCommentVotes(req.params.comment_id, req.body)
    .then((updatedComment) => {
      res.status(200).send(updatedComment);
    })
    .catch((err) => {
      next(err);
    });
}

//EXPORTS
module.exports = { patchComments };
