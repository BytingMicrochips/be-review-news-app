//REQUIRES
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");

//ENDPOINTS
app.get("/api/topics", getTopics);

//EXPORTS
module.exports = app;
