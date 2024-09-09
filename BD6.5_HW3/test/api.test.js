const request = require("supertest");
const http = require("http");
let {app, validateArticle, validateAuthor} = require("../index.js");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

// Exercise 3: Test Add a new Article with Valid Input
describe("API Endpoints to add data", () => {
  it("should add a new Article with valid input", async () => {
    const res = await request(server)
      .post("/articles")
      .send({
        title: 'Mastering Node.js',
        content: 'Node.js is a powerful tool for backend development...'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: 'Mastering Node.js',
      content: 'Node.js is a powerful tool for backend development...'
    });
  });

  //Exercise 4: Test add a new Article with invalid input
  it("to verify that the POST /articles endpoint returns a 400 status code", async () => {
    const result = await request(server).post("/articles").send({
      title: 'Mastering Node.js'
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The content is required & should be a string");
  });

  // Exercise 5: Test add a new Author with valid input
  it("should add a new Company with valid input", async () => {
    const res = await request(server)
      .post("/authors")
      .send({
        name: 'John Doe',
        articleId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe'
      articleId: 1
    });
  });
  //Exercise 6: Test add a new Author with invalid input
  it("verify that the POST /authors endpoint returns a 400 status code when provided with invalid input", async () => {
    const result = await request(server).post("/authors").send({
      name: 'John Doe'
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The articleId is required & should be a number");
});
});

describe("validation functions", () => {
  //Exercise 7: Test Article Validation Function with Jest Mocks
  it("should validate the article input correctly", () => {
    expect(validateArticle({    title: 'Mastering Node.js',
    content: 'Node.js is a powerful tool for backend development...' })).toBeNull();
    //Exercise 8: Test Artcile Validation Function Error Handling with Jest Mocks
    expect(validateArticle({  title: 'Mastering Node.js' })).toEqual(
      "The content is required & should be a string",
    );
    expect(validateArticle({ content: 'Node.js is a powerful tool for backend development...' })).toEqual(
      "The title is required & should be a string",
    );
  });

 // Exercise 9: Test Author Validation Function with Jest Mocks
  it("should validate author input correctly", () => {
    expect(
      validateAuthor({
        id: 1,
        name: 'John Doe'
        articleId: 1
      }),
    ).toBeNull();
   // Exercise 10: Test Author Validation Function Error Handling with Jest Mocks
    expect(validateAuthor({  name: 'John Doe' })).toEqual(
      "The articleId is required & should be a number",
    );
    expect(validateAuthor({articleId: 1})).toEqual(
      "The author name should be a string and is required",
    );
  });
});
