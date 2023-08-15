//REQUIRES
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getArticles } = require("./controllers/articles-controller.js");

//ENDPOINTS
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);

//ERROR HANDLING
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: `That input is invalid` });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(404).send({ msg: `We don't have that article!` });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: `Sorry! We can't do that right now` });
});

//EXPORTS
module.exports = app;
