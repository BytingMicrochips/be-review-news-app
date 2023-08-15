//REQUIRES
const { findEndpoints } = require("../models/endpoints-model");

//FUNCTION
function getEndpoints(req, res, next) {
    findEndpoints()
        .then((endpoints) => {
            res.status(200).send(endpoints)
         })
        .catch((err) => {
            next(err)
        });
};

//EXPORTS
module.exports = { getEndpoints };