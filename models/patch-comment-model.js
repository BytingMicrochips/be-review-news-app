//REQUIRE
const db = require("../db/connection.js");

//FUNCTION
function patchCommentVotes(comment_id, body) {
  if (typeof body.inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: `Can not update votes by value ${body.inc_votes}!`,
    });
  }

  if (Object.keys(body).length === 1 || !body.inc_votes) {
    return db
      .query(
        `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`,
        [body.inc_votes, comment_id]
      )
      .then(({ rows }) => {
        if (rows[0] !== undefined) {
          return rows[0];
        } else {
          return Promise.reject({
            status: 404,
            msg: `That comment doesn't exist`,
          });
        }
      });
  }
  return Promise.reject({
    status: 400,
    msg: `Detected irregular post request <0_o> `,
  });
}

//EXPORTS
module.exports = { patchCommentVotes };
