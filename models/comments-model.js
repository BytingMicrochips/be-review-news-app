//REQUIRES
const db = require("../db/connection.js");

//FUNCTION
function selectComments(article_id) {
    const onlyDigitsRegex = /(^[0-9]+$)/
    if (onlyDigitsRegex.test(article_id)) {
            return db
              .query("SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC;", [article_id])
                .then(({ rows }) => {
                    if (rows.length > 0) {
                        return rows;
                    } else {
                      return Promise.reject({
                        status: 404,
                        msg: `We couldn't find any comments on that...`,
                      });   
                  }
              });
    } else {
        return Promise.reject({status : 400, msg: `${article_id} is not a valid article_id`})
    }

}

//EXPORTS
module.exports = {selectComments}