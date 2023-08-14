//REQUIRES
const { selectTopics } = require("../models/topics-model");

//FUNCTIONS
function getTopics(req, res, next) {
  selectTopics()
    .then((topics) => {
      if (topics.length > 0) {
        res.status(200).send(topics);
      }
    })
    .catch((err) => {
      next(err);
    });
}

//EXPORTS
module.exports = { getTopics };
