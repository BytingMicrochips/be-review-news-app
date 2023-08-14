//REQUIRES
const db = require("../db/connection.js");

//FUNCTIONS
function selectTopics() {
  return db.query("SELECT * FROM topics;").then((topics) => {
    return topics.rows;
  });
}

//EXPORTS
module.exports = { selectTopics };
