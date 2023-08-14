//REQUIRES
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");

//ENDPOINTS
app.get("/api/topics", getTopics);

//ERROR HANDLING 
app.use((err, req, res, next) => {
    res.status(500).send({msg: `Sorry! We can't do that right now`})
})


//EXPORTS
module.exports = app;
