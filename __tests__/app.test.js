//REQUIRES
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpointsJSON = require("../endpoints.json");
const { expect } = require("@jest/globals");



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
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });
    test("Should return an array with length equal to total number of topics in database", () => {
      return request(app)
        .get("/api/topics")
        .then(({ body }) => {
          expect(body.length).toBe(3);
        });
    });
    test(`Each object in the  returned array should have keys of 'slug' and 'description'`, () => {
      return request(app)
        .get("/api/topics")
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
        .then(({ body }) => {
          body.forEach((topic) => {
            expect(Object.keys(topic).length).toBe(2);
          });
        });
    });
  });
  describe("GET /api", () => {
    test("Should return status 200 when accessed", () => {
      return request(app)
        .get("/api")
        .expect(200);
    });
    test("Should return an object", () => {
      return request(app)
        .get("/api")
        .then((endpoints) => {
          expect(typeof endpoints).toBe("object");
        });
    });
    test("Should return an object with all the data from the endpoints.json", () => {
      return request(app)
        .get("/api")
        .then(({ body }) => { 
          expect(body).toMatchObject(endpointsJSON)
        })
    })
  });
});