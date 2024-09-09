const request = require("supertest");
const http = require("http");
let { app, addUsers, validateBook, addNewReview } = require("../index.js");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(5001, done);
});

afterAll((done) => {
  server.close(done);
});

// Exercise 4: Test add a new user with valid input
describe("API Endpoints to add data", () => {
  it("should add a new user with valid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Alice", email: "alice@example.com" });

    expect(res.statusCode).toEqual(201);
    // console.log(typeof res.body);
    expect(res.body).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  });

  //Exercise 5: Test add a new user with invalid input
  it("to verify that the POST /api/users endpoint returns a 400 status code", async () => {
    const result = await request(server).post("/api/users").send({
      name: "Alice",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The email is required & should be a string");
  });

  // Exercise 6: Test add a new book with valid input
  it("should add a new book with valid input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby", author: "F Scott Fitzgerald" });
    console.log(res.body);
    console.log(res.statusCode);
    expect(res.statusCode).toEqual(201);

    expect(res.body).toEqual({
      id: 1,
      title: "The Great Gatsby",
      author: "F Scott Fitzgerald",
    });
  });
  //Exercise 7: Test add a new book with invalid input
  it("verify that the POST /api/books endpoint returns a 400 status code when provided with invalid input", async () => {
    const result = await request(server).post("/api/books").send({
      author: "Lewis Carroll",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The title should be a string and is required");
  });
  //Exercise 8: Test add a new review with valid input
  it("should add a new review with valid input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great Writing", userId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great Writing",
      userId: 1,
    });
  });
  //Exercise 9: Test add a new review with invalid input
  it("to verify that the POST /api/reviews endpoint returns a 400 status code", async () => {
    const result = await request(server).post("/api/reviews").send({
      content: "Great Writing",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual(
      "The userId is required & should be an integer",
    );
  });
});

describe("validation functions", () => {
  //Exercise 10: Test user validation function
  it("should validate the user input correctly", () => {
    expect(addUsers({ name: "Alice", email: "alice@example.com" })).toBeNull();
    expect(addUsers({ name: "Alice" })).toEqual(
      "The email is required & should be a string",
    );
    expect(addUsers({ email: "alice@example.com" })).toEqual(
      "The name is required & should be a string",
    );
  });

  //Exercise 11: Test book validation function
  it("should validate book input correctly", () => {
    expect(
      validateBook({ title: "The Great Gatsby", author: "F Scott Fitzgerald" }),
    ).toBeNull();
    expect(validateBook({ title: "The Great Gatsby" })).toEqual(
      "The author should be a string and is required",
    );
    expect(validateBook({ author: "F Scott Fitzgerald" })).toEqual(
      "The title should be a string and is required",
    );
  });

  // Exercise 12: Test review validation function
  it("should validate review input correctly", () => {
    expect(addNewReview({ content: "Great Writing", userId: 1 })).toBeNull();
    expect(addNewReview({ content: "Great Writing" })).toEqual(
      "The userId is required & should be an integer",
    );
    expect(addNewReview({ userId: 1 })).toEqual(
      "The content is required & should be a string",
    );
  });
});
