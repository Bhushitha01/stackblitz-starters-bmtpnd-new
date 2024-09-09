let express = require("express");
let app = express();
app.use(express.json());
let users = [];

//Exercise 1: Add a New User
function addUsers(body) {
  if (!body.name || typeof body.name !== "string") {
    return ("The name is required & should be a string");
  } else if (!body.email || typeof body.email !== "string") {
    return ("The email is required & should be a string");
  } else {
    return null;
  }
}
app.post("/api/users", (req, res) => {
  let error = addUsers(req.body);
 // console.log(error)

  if (error) {
    res.status(400).send(error);
  }
  let newAddedUser = { id: users.length + 1, ...req.body };
  users.push(newAddedUser);
  res.status(201).json(newAddedUser);
});

let books = [];

//Exercise 2: Add a New Book
function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "The title should be a string and is required";
  }
  else if (!book.author || typeof book.author !== "string") {
    return "The author should be a string and is required";
  } else {
  return null; 
  }
}
app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
   console.log(error)
  if (error) {
    res.status(400).send(error);
  }
  let book = { id: books.length + 1, ...req.body }; //Use req.body directly instead of 'book'
  books.push(book);
  res.status(201).json(book);
});

// /Exercise 3: Add a New Review
let review = [];
function addNewReview(newRe) {
  if (!newRe.content || typeof newRe.content !== "string") {
    return "The content is required & should be a string";
  }
  else if (!newRe.userId || typeof newRe.userId !== "number") {
    return "The userId is required & should be an integer";
  } else {
  return null;
  }
}

app.post("/api/reviews", (req, res) => {
  let error = addNewReview(req.body);
  if (error) {
    //if there is an error then send error
    res.status(400).send(error);
  }
  let newReview = { id: review.length + 1, ...req.body };
  review.push(newReview);
  res.status(201).json(newReview);
});
module.exports = { app, addUsers, validateBook, addNewReview };

