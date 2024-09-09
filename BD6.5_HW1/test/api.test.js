const request = require("supertest");
const http = require("http");
let {app, addGame, validateTournament} = require("../index.js");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

// Exercise 3: Test Add a New Game with Valid Input
describe("API Endpoints to add data", () => {
  it("should add a new game with valid input", async () => {
    const res = await request(server)
      .post("/api/games")
      .send({
        title: "The Legend of Zelda",
        genre: "Adventure"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure"
    });
  });

  //Exercise 4: Test add a new Game with invalid input
  it("to verify that the POST /api/games endpoint returns a 400 status code", async () => {
    const result = await request(server).post("/api/games").send({
      title: "The Legend of Zelda"
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The genre is required & should be a string");
  });

  // Exercise 5: Test add a new Tournament with valid input
  it("should add a new Tournament with valid input", async () => {
    const res = await request(server)
      .post("/api/tournament")
      .send({
        name: 'Zelda Championship',
        gameId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'Zelda Championship',
      gameId: 1
    });
  });
  //Exercise 6: Test add a new Tournament with invalid input
  it("verify that the POST /api/tournament endpoint returns a 400 status code when provided with invalid input", async () => {
    const result = await request(server).post("/api/tournament").send({
      name: 'Zelda Championship',
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The gameId should be a number and is required");
});
});

describe("validation functions", () => {
  //Exercise  7: Test Game Validation Function with Jest Mocks
  it("should validate the game input correctly", () => {
    expect(addGame({  title: "The Legend of Zelda",
    genre: "Adventure" })).toBeNull();
    //Exercise 8: Test Game Validation Function Error Handling with Jest Mocks
    expect(addGame({ title: "The Legend of Zelda" })).toEqual(
      "The genre is required & should be a string",
    );
    expect(addGame({ genre: "Adventure" })).toEqual(
      "The title is required & should be a string",
    );
  });

 // Exercise 9: Test Tournament Validation Function with Jest Mocks
  it("should validate Tournament input correctly", () => {
    expect(
      validateTournament({
        name: 'Zelda Championship',
        gameId: 1
      }),
    ).toBeNull();
    expect(validateTournament({  name: 'Zelda Championship' })).toEqual(
      "The gameId should be a number and is required",
    );
    expect(validateTournament({ gameId: 1 })).toEqual(
      "The name should be a string and is required",
    );
  });
});
