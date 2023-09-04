//REQUIRE
const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers/endpoints-controller")

//ROUTER
apiRouter.get("/api", (req, res) => {
  res.status(200).send("All OK from API Router");
});

apiRouter.get("/api", getEndpoints);

//EXPORT
module.exports = {apiRouter};