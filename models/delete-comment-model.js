//REQUIRE
const db = require("../db/connection.js");

//FUNCTION
function removeComment(comment_id) {
  const onlyDigitsRegex = /(^[0-9]+$)/;
  if (!onlyDigitsRegex.test(comment_id)) {
    return Promise.reject({
      status: 400,
      msg: `${comment_id} is not a valid comment_id`,
    });
  }
    return db.query
        (`DELETE FROM comments
          WHERE comments.comment_id = $1
          RETURNING *;`, [comment_id]
    ).then(({rows}) => {
        if (rows.length === 1) {
            Promise.resolve()
        } else {
            return Promise.reject({
                status: 400,
                msg: `No comment deleted`
            })
        }
    })
}

//EXPORTS
module.exports = {removeComment}