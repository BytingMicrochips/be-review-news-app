//REQUIRES
const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/endpoints-controller.js");
const { getTopics } = require("./controllers/topics-controller.js");
const { getAllArticles } = require("./controllers/allArticles-controller.js");
const { getArticles } = require("./controllers/articles-controller.js");
const { postComments } = require("./controllers/post-comments-controller.js");
const { getComments } = require("./controllers/comments-controller.js");
const { patchArticles } = require("./controllers/patch-articles-controller.js");
const { deleteComments } = require("./controllers/delete-comments-controller.js");
app.use(express.json());


//ENDPOINTS
app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticles);

app.patch("/api/articles/:article_id", patchArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComments);

app.delete("/api/comments/:comment_id", deleteComments);


//ERROR HANDLING
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: `That input is invalid` });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {

  if (err.code === '42601'){
     res.status(500).send(`We are experiencing difficulties... try again later`);
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
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
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
