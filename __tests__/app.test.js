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
})
