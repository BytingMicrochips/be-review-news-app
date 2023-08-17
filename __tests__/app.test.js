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
      return request(app).get("/api/articles/1")
        .expect(200);
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
        }
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
  describe("GET /api/articles/:article_id/comments", () => {
    test("Should return 200 status code", () => {
      return request(app).get("/api/articles/1/comments")
        .expect(200);
    });
    test("Should return an array of comment objects with desired keys", () => {
      const expectedShape = {
        comment_id: 10,
        body: "git push origin master",
        votes: 0,
        author: "icellusedkars",
        article_id: 3,
        created_at: "2020-06-20T07:24:00.000Z",
      };
      return request(app)
        .get("/api/articles/3/comments")
        .then(({ body }) => {
          expect(body.comments[1]).toMatchObject(expectedShape)
        })
    });
    test("Should serve comments in order of most recent first", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {descending : true});
          
        });
    });
    test("Should send code 400 if invalid article_id is entered", () => {
      return request(app)
        .get("/api/articles/burritoSupreme/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe(`burritoSupreme is not a valid article_id`);
        })
    });
    test("Should send code 200 and message if no comments found", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).toBe(`No comments found...`);
        });
    });
    test("Should send code 404 and message if article does not exist", () => {
      return request(app)
        .get("/api/articles/999/comments")
        .expect(404)
        .then(({ body: {msg} }) => {
          expect(msg).toBe(`article_id 999 does not exist`);
        });
    });
    })
  });

