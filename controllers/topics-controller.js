//REQUIRES
const { selectTopics } = require("../models/topics-model");

//FUNCTIONS
function getTopics(req, res, next) {
  selectTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
      .catch((err) => {
        console.log(err, '---err')
      next(err);
    });
}

//EXPORTS
module.exports = { getTopics };
