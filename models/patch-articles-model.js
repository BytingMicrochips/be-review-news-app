//REQUIRE
const db = require("../db/connection.js");

//FUNCTION
function patchVotes(article_id, body) {
  console.log(Object.keys(body));
  if (typeof body.inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: `Can not update votes by value ${body.inc_votes}!`,
    });
  }

  if (Object.keys(body).length === 1 || !body.inc_votes) {
    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
        [body.inc_votes, article_id]
      )
      .then(({ rows }) => {
        if (rows[0] !== undefined) {
          return rows[0];
        } else {
          return Promise.reject({
            status: 400,
            msg: `That article doesn't exist`,
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
module.exports = {patchVotes}