# Northcoders News API
## Hello new user - thank you for accessing my News API!


**This readme will contain everything you need to know about the API - both for using the current hosted version and cloning the repo locally.**

The API is currently being hosted [here](https://nc-news-service-h8vo.onrender.com/api/articles/12)

This API is designed to serve information about articles held within a psql database table. 

Articles, comments and information about users can all be served by accessing different endpoints.

Queries can be made on some endpoints, in addition to PATCH, POST and DELETE requests.

For a full list of endpoints and their functionality look at the served JSON file on endpoint `/api`

---


### Creating a local copy of the repo...
The project repo is being hosted [here](https://github.com/BytingMicrochips/be-review-news-app)

Fork and clone the repo to a local folder using the git clone command.

In order to locally connect to the two databases you will need to create your own .env files:

- Create two files, .env.development and .env.test 
 
- Inside the .env.development, add the line:  `PGDATABASE=nc_news`  

- Inside the .env.test file, add the line:   `PGDATABASE=nc_news_test`

---

**All dependecies are listed in the package.json, for user functionality you will require:**

- *dotenv*
- *express*
- *pg*

**Developer dependencies required are, please refer to their individual docs for installation guides:**

- *husky*
- *jest*
- *jest-extended*
- *jest-sorted*
- *pg-format*
- *supertest*

---
**To create and seed the databases run the following commands using node:**

- `npm run setup-dbs`
- `npm run seed`

To run the test suite use the command:

- `npm run test`

This project was created using [node v20.2.0](https://nodejs.org/en) and [PostgreSQL 14.8](https://www.postgresql.org/download/) both are required at the specified or more recent version.

---

### I hope you enjoy using this API, for any questions please contact me via my github profile

[BytingMicrochips](https://github.com/BytingMicrochips/)
