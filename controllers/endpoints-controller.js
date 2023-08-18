//REQUIRE
const jsonEndpoints = require("../endpoints.json");

//FUNCTION
function getEndpoints(req, res, next) {
  return res.status(200).send(jsonEndpoints)
}

//EXPORTS
module.exports = {getEndpoints}

