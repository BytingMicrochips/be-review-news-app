//REQUIRES
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getEndpoints } = require("./controllers/endpoints-controller.js");


//ENDPOINTS
app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);


//ERROR HANDLING 
app.use((err, req, res, next) => {
    res.status(500).send({msg: `Sorry! We can't do that right now`})
})


//EXPORTS
module.exports = app;
