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
 })
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
        });
    });
    });
    describe("GET /api/topics", () => {
      test("Should return 200 status code", () => {
        return request(app).get("/api/topics").expect(200);
      });
      test("Should return an array with length equal to total number of topics in database and have correct keys", () => {
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
    });
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
          comment_count: 11,
        };
        return request(app)
          .get("/api/articles")
          .then(({ body }) => {
            expect(Array.isArray(body.articles)).toBe(true);
            expect(body.articles.length).toBe(13);
            expect(body.articles[6]).toMatchObject(expectedObject);
            body.articles.forEach((dataSet) => {
              expect(Object.keys(dataSet).length).toBe(8);
            });
          });
      });
      test("Should sort the returned articles in order of created_at descending", () => {
        return request(app)
          .get("/api/articles")
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at", {
              descending: true,
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
            comment_count: 11
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
    describe(`PATCH /api/articles/:article_id`, () => {
      test("Should return status 200 when succcesfully patched article", () => {
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: 0 })
          .expect(200);
      });
      test("Should return the chosed article object", () => {
        const matchedShape = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: `2020-07-09T20:11:00.000Z`,
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: 0 })
          .then(({ body }) => {
            expect(body).toMatchObject({ ...matchedShape });
          });
      });
      test("Should increase the votes key of the chosen article by value passed", () => {
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: 10 })
          .then(({ body }) => {
            expect(body.votes).toBe(110);
          });
      });
      test("Should decrease the votes key of the chosen article by value passed", () => {
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: -40 })
          .then(({ body }) => {
            expect(body.votes).toBe(60);
          });
      });
      test("Should send status 400 and error message if inc_votes  is not a number", () => {
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: "DeepFriedIceCream" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`Can not update votes by value DeepFriedIceCream!`);
          });
      });
      test("Should send status 400 and error message if attempt to vote on invalid article_id", () => {
        return request(app)
          .patch(`/api/articles/mylkShake`)
          .send({ inc_votes: 50 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`That input is invalid`);
          });
      });
      test("Should send status 404 and error message if article_id doesn't exist", () => {
        return request(app)
          .patch(`/api/articles/999`)
          .send({ inc_votes: 25 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`That article doesn't exist`);
          });
      });
      test("Should send status 400 and error message if request body contains undesired keys", () => {
        return request(app)
          .patch(`/api/articles/1`)
          .send({ inc_votes: 35, maliciousKey: `DROP TABLE users;` })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`Detected irregular post request <0_o> `);
          });
      });
    });
    describe("GET /api/articles/:article_id/comments", () => {
      test("Should return 200 status code", () => {
        return request(app).get("/api/articles/1/comments").expect(200);
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
            expect(body.comments[1]).toMatchObject(expectedShape);
          });
      });
      test("Should serve comments in order of most recent first", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("Should send code 400 if invalid article_id is entered", () => {
        return request(app)
          .get("/api/articles/burritoSupreme/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe(`burritoSupreme is not a valid article_id`);
          });
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
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`article_id 999 does not exist`);
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
        };
        test("Should return status 201 when new comment successfully posted", () => {
          return request(app)
            .post("/api/articles/3/comments")
            .send({ ...commentThis })
              .expect(201);
        });
        test("Should return posted comment showing all desired keys", () => {
          return request(app)
            .post("/api/articles/3/comments")
            .send({ ...commentThis })
            .then(({ body }) => {
              expect(body.comment).toMatchObject({ ...matchedShape });
            });
        });
        test("Should return 400 and error message if user attempts to post empty body", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "Monstera_Munch" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(`Nothing to post!`);
            });
        });
        test("Should return 400 and error message if user attempts to post anonymously", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ body: "The mystery poster strikes again!" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(`Malformed request body, missing username key`);
            });
        });
      });
    });
    describe("DELETE /api/comments/:comment_id", () => {
        test("Should return 204 when delete is successful", () => {
          return request(app)
            .delete("/api/comments/1")
              .expect(204);
        });
        test("Should return 400 and error message when comment_id is invalid type", () => {
          return request(app)
            .delete("/api/comments/buffaloFries")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("buffaloFries is not a valid comment_id");
            })
        });
        test("Should return 404 and error message when nothing deleted", () => {
          return request(app)
            .delete("/api/comments/9999")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("No comment deleted");
            });
        });
    });
    describe("GET /api/users", () => {
    test("Should return status 200", () => {
      return request(app)
        .get("/api/users")
        .expect(200);   
    })
    test("Should return an object with all users in array on a key of 'users'", () => {
      return request(app)
        .get("/api/users")
        .then(({ body: { users } }) => {
          expect(users.length).toBe(4)
          users.forEach((user) => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("avatar_url");
          });
        });
    });
    });
    describe("GET /api/articles with QUERIES", () => {
  test("Should return status 200 for a valid query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200);
  })
  test("Should return items only matching the topic query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .then(({ body: { articles } }) => {
        articles.forEach((singleArticle) => {
          expect(singleArticle.topic).toBe("mitch")
        })
      })
  });
  test("Should return items in order specified", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { ascending: true })
      });
  })
  test("Should return correct articles if queries are chained together", () => {
    return request(app)
      .get("/api/articles?order=asc&&topic=mitch")
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { ascending: true });
        articles.forEach((singleArticle) => {
          expect(singleArticle.topic).toBe("mitch");
        });
      });
  });
  test("Should return status 400 and message if sort_by value is invalid", () => {
    return request(app)
      .get("/api/articles?sort_by=caffeine")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Can't sort articles by 'caffeine', sorry!`)
      });
  })
  test("Should return status 400 and message if order value is invalid", () => {
    return request(app)
      .get("/api/articles?order=chaotic")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Can't order articles by 'chaotic', sorry!`);
      });
  });
  test("Should return status 404 and error message if query returns no articles", () => {
    return request(app)
      .get("/api/articles?topic=sataySummerRolls&&order=ASC")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`We don't have any articles about sataySummerRolls`);
      });
  });
  test("Should return items sorted by property selected", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&&order=desc")
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("votes", { descending: true });
      });
  });
  test("Should return 200 and message if valid topic has no articles", () => {
    return request(app)
      .get("/api/articles?topic=coding")
      .expect(200)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual(`The topic 'coding' has no articles yet`);
      });
  });
    });


    describe(`PATCH /api/comments/:comment_id`, () => {
      test("Should return status 200 when succcesfully patched comment", () => {
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: 0 })
          .expect(200);
      });
      test("Should return the chosed comment object", () => {
        const matchedShape = {
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 16,
          author: "butter_bridge",
          article_id: 9,
          created_at: "2020-04-06T12:17:00.000Z",
        };
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: 0 })
          .then(({ body }) => {
            expect(body).toMatchObject({ ...matchedShape });
          });
      });
      test("Should increase the votes key of the chosen comment by value passed", () => {
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: 10 })
          .then(({ body }) => {
            expect(body.votes).toBe(26);
          });
      });
      test("Should decrease the votes key of the chosen comment by value passed", () => {
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: -15 })
          .then(({ body }) => {
            expect(body.votes).toBe(1);
          });
      });
      test("Should send status 400 and error message if inc_votes  is not a number", () => {
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: "DeepFriedIceCream" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              `Can not update votes by value DeepFriedIceCream!`
            );
          });
      });
      test("Should send status 400 and error message if attempt to vote on invalid comment_id", () => {
        return request(app)
          .patch(`/api/comments/mylkShake`)
          .send({ inc_votes: 50 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`That input is invalid`);
          });
      });
      test("Should send status 404 and error message if comment_id doesn't exist", () => {
        return request(app)
          .patch(`/api/comments/999`)
          .send({ inc_votes: 25 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`That comment doesn't exist`);
          });
      });
      test("Should send status 400 and error message if request body contains undesired keys", () => {
        return request(app)
          .patch(`/api/comments/1`)
          .send({ inc_votes: 35, maliciousKey: `DROP TABLE users;` })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(`Detected irregular post request <0_o> `);
          });
      });
    });