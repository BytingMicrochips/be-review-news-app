//REQUIRE
const { fetchUsers } = require('../models/users-model')

//FUNCTION
function getUsers(req, res, next) {
    fetchUsers()
      .then((fetchedUsers) => {
        res.status(200).send({ users: fetchedUsers });
      })
        .catch((err) => {
          console.log(err)
        next(err);
      });
}

//EXPORT
module.exports = {getUsers}