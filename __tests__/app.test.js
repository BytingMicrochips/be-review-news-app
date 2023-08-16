//REQUIRES
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

//PRE AND POST TEST FUNCTIONS
afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

//TEST SUITE
describe("Northcoders News API ", () => {
  test("Should return status 404 if invalid endpoint accessed", () => {
    return request(app).get("/api/banana").expect(404);
  });
  describe("GET /api/topics", () => {
    test("Should return 200 status code", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("Should return an array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });
    test("Should return an array with length equal to total number of topics in database", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(3);
        });
    });
    test(`Each object in the  returned array should have keys of 'slug' and 'description'`, () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          body.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
    test("Each object in the returned array should only have 2 keys", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          body.forEach((topic) => {
            expect(Object.keys(topic).length).toBe(2);
          });
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("Should return 200 status code", () => {
      return request(app).get("/api/articles/1").expect(200);
    });
    test("Returned object should have desired keys only", () => {
      const articleTemplate = {
        article: {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        },
      };
      return request(app)
        .get("/api/articles/1")
        .then(({ body }) => {
          expect(body).toMatchObject(articleTemplate);
        });
    });
    test("Should return status 404 and error message if article_id does not exist", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(`We can't find that!`);
        });
    });
    test("Should return status 400 and error message if article_id is invalid type", () => {
      return request(app)
        .get("/api/articles/bananaPancakes")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(`That input is invalid`);
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
          const commentThis = {
            username: "butter_bridge",
            body: `Did you just finish all the coffee?!`,
          }; 
          const matchedShape = {
            comment_id: 19,
            body: `Did you just finish all the coffee?!`,
            article_id: 3,
            author: "butter_bridge",
            votes: 0,
            created_at: '2023-08-16T17:57:37.000Z',
          };
    test("Should return status 201 when new comment successfully posted", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ ...commentThis })
        .then(() => {
          expect(201);
        });
    });
    test("Should return posted comment showing all desired keys", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ ...commentThis })
        .then(({ body }) => {
          expect(Object.keys(body)).toEqual(Object.keys({...matchedShape}));
        });
    });
    test("Should return 400 and error message if user attempts to post empty body", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "Monstera_Munch" })
        .then(({ body: { msg } }) => {
          expect(400)
          expect(msg).toBe(`Nothing to post!`);
        });
    });
    test("Should return 400 and error message if user attempts to post anonymously", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ body: "The mystery poster strikes again!" })
        .then(({ body: { msg } }) => {
          expect(400);
          expect(msg).toBe(`No anonymous posting allowed, please log in`);
        });
    });
    test("Should return 400 and error message if request body has undesired keys", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "Hackerboi99",
          body: "Digital chaos!",
          suspectInput: "DROP TABLE users;",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(`Invalid comment posting request`);
        });
    });
  });
});
