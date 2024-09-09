let express = require("express");
let app = express();
app.use(express.json());
let articleArray = [];

//Exercise 1: Add a New Article
function validateArticle(articleFromBody) {
  if (!articleFromBody.title || typeof articleFromBody.title !== "string") {
    return ("The title is required & should be a string");
  } else if (!articleFromBody.content || typeof articleFromBody.content !== "string") {
    return ("The content is required & should be a string");
  } else {
    return null;
  }
}
app.post("/articles", (req, res) => {
  let error = validateArticle(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let newAddedArticle= { id: articleArray.length + 1, ...req.body };
  articleArray.push(newAddedArticle);
  res.status(201).json(newAddedArticle);
});

let authors = [];

//Exercise 2: Add a New author
function validateAuthor(newAuthor) {
  if (!newAuthor.name || typeof newAuthor.name !== "string") {
    return "The author name should be a string and is required";
  } else if (!newAuthor.articleId || typeof newAuthor.articleId !== "number") {
    return ("The articleId is required & should be a number");
  } 
   else {
  return null; 
  }
}
app.post("/authors", (req, res) => {
  let error = validateAuthor(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let newAuthor= { id: authors.length + 1, ...req.body };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});


module.exports = { app, validateArticle, validateAuthor };
