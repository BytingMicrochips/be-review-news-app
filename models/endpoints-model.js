//REQUIRES
const jsonEndpoints = require("../endpoints.json");

//FUNCTION
 function findEndpoints() {
    return Promise.resolve(jsonEndpoints);
 }

//EXPORTS
module.exports =  {findEndpoints} ;
