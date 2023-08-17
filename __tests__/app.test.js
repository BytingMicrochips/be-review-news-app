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
  test('Should return status 404 if invalid endpoint accessed', () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
  })
  describe("GET /api/topics", () => {
    test("Should return 200 status code", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("Should return an array with length equal to total number of topics in database and correct keys", () => {
      return request(app)
        .get("/api/topics")
        .then(({ body }) => {
          expect(body.length).toBe(3);
          body.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
    test("Each object in the returned array should only have 2 keys", () => {
      return request(app)
        .get("/api/topics")
        .then(({ body }) => {
          body.forEach((topic) => {
            expect(Object.keys(topic).length).toBe(2);
          });
        });
    });
  })
  describe("GET /api/articles", () => {
    test("Should return 200 status code", () => {
      return request(app).get("/api/articles").expect(200);
    });
    test("Should return an array of objects with desired keys", () => {
      const expectedObject = {
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        article_id: 1,
        topic: "mitch",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        comment_count: "11"
      };
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          expect(Array.isArray(body.articles)).toBe(true)
          expect(body.articles[6]).toMatchObject(expectedObject)
          body.articles.forEach((dataSet) => {
            expect(Object.keys(dataSet).length).toBe(8)
          })
      });
    });
    test("Should sort the returned articles in order of created_at descending", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {descending : true})
        })
    })
   })
 })