import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // request and response
  console.log(req.rawHeaders); // overview if what is requested
  res.send("<h1>We have been expecting you adventurer</h1>"); // send back the response
});

// Adding another endpoint
app.get("/about", (req, res) => { // executed if the user's endpoint will be localhost:3000/about
    res.send("<h1>About me</h1>");
});

app.get("/contact", (req, res) => { // executed if the user's endpoint will be localhost:3000/about
    res.send("<h1>You can never find me unless i want to be found</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
