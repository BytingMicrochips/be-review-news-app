//REQUIRES
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getArticles } = require("./controllers/articles-controller.js");
const { patchArticles } = require("./controllers/patch-articles-controller.js");
app.use(express.json());

//ENDPOINTS
app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.patch("/api/articles/:article_id", patchArticles);

//ERROR HANDLING
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: `That input is invalid` });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: `We can't find that!` });
  } else {
    next(err);
   }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: `Sorry! We can't do that right now` });
});

//EXPORTS
module.exports = app;
