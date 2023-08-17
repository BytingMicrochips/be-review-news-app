// //REQUIRE
// const {removeComment} = require("../models/delete-comment-model");

// //FUNCTION
// function deleteComments(req, res, next) {
//     removeComment(req.params.comment_id)
//       .then(() => {
//         res.status(204).send();
//       })
//         .catch((err) => {
//         next(err);
//       });
// }

// //EXPORTS
// module.exports = {deleteComments}