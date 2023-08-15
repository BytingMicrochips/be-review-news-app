// REQUIRE
const db = require("../db/connection.js");

//FUNCTION 
function fetchAllArticles() {
    return db.query("SELECT * FROM articles ORDER BY data DESC;").then((articles) => {
        return articles.rows;
    })
}

//EXPORT
module.exports = {fetchAllArticles}