// REQUIRE
const db = require("../db/connection.js");

//FUNCTION 
function fetchAllArticles({ topic, sort_by = "created_at", order = "DESC" }) {
  const upperOrder = order.toUpperCase();
  const sortByWhitelist = ['author', 'title', 'article_id', 'topic',
    'created_at', 'votes', 'article_img_url', 'comment_count']
  const orderWhiteList = ["asc", "desc", "ASC", "DESC"]

  if (!sortByWhitelist.includes(sort_by)) {
       return Promise.reject({
      status: 400,
      msg: `Can't sort articles by '${sort_by}', sorry!`
    });
  }
  if (!orderWhiteList.includes(order)) {
       return Promise.reject({
      status: 400,
      msg: `Can't order articles by '${order}', sorry!`,
    });
  }

  const queryValues = [];
  let queryStr = `
SELECT articles.author, articles.title, articles.article_id, 
articles.topic, articles.created_at, articles.votes, 
articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;
  
  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE topic = $1`;
  }

  if (sort_by) {
    queryStr += ` GROUP BY articles.article_id`;
    queryStr += ` ORDER BY ${sort_by} ${upperOrder}`;
  }

  if (queryValues.length === 0) {
    return db.query(queryStr)
      .then(({ rows }) => {
        if (rows.length) {
          return rows;
        }
  });
  } else {
    return db.query(queryStr, queryValues).then(({ rows }) => {
      if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No articles currently match your query`,
      });
      } else {
        return rows;
    }
  });
}
}

//EXPORT
module.exports = { fetchAllArticles };

