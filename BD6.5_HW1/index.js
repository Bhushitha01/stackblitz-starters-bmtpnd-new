let express = require("express");
let app = express();
app.use(express.json());
let games = [];

//Exercise 1: Add a New Game
function addGame(gameBody) {
  if (!gameBody.title || typeof gameBody.title !== "string") {
    return ("The title is required & should be a string");
  } else if (!gameBody.genre || typeof gameBody.genre !== "string") {
    return ("The genre is required & should be a string");
  } else {
    return null;
  }
}
app.post("/api/games", (req, res) => {
  let error = addGame(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let newAddedGame= { id: games.length + 1, ...req.body };
  games.push(newAddedGame);
  res.status(201).json(newAddedGame);
});

let tournament = [];

//Exercise 2: Add a New tournament
function validateTournament(addedTournament) {
  if (!addedTournament.name || typeof addedTournament.name !== "string") {
    return "The name should be a string and is required";
  }
  else if (!addedTournament.gameId || typeof addedTournament.gameId !== "number") {
    return "The gameId should be a number and is required";
  } else {
  return null; 
  }
}
app.post("/api/tournament", (req, res) => {
  let error = validateTournament(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let tournaments = { id: tournament.length + 1, ...req.body };
  tournament.push(tournaments);
  res.status(201).json(tournaments);
});


module.exports = { app, addGame, validateTournament };
