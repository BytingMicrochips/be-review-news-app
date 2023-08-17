//REQUIRE
const db = require("../db/connection.js");

//FUNCTION
function fetchUsers() {
    return db.query("SELECT * FROM users;").then((users) => {
            return users.rows;
  });   
}

//EXPORT
module.exports = {fetchUsers}