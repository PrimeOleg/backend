// Importing required modules
import express from "express"; // Express is a web framework for building web servers and handling HTTP requests.
const app = express(); // Create an Express application.
const port = 3000; // Define the port number where the server will listen for requests.
import { dirname } from "path"; // 'path' helps with file and directory paths.
import { fileURLToPath } from "url"; // Converts a file URL (like import.meta.url) into a file path.
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies (e.g., form data).

// Get the directory name of the current file
const __dirname = dirname(fileURLToPath(import.meta.url)); // Converts the current file's URL to its directory path.

// Variable to track if the user is authorised
var authorised = false; // Initially set to false, meaning the user is not authorised.

// Define a GET route for the root URL ("/")
app.get("/", (req, res) => {
  // Send the 'index.html' file located in the 'public' folder as the response
  res.sendFile(__dirname + "/public/index.html");
});

// Use body-parser middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
// 'extended: true' allows parsing of nested objects in the form data.

// Middleware function to check the password
function passwordChecker(req, res, next) {
  // Check if the password entered by the user matches "ILoveProgramming"
  if (req.body["password"] === "ILoveProgramming") {
    authorised = true; // If the password is correct, set 'authorised' to true.
  }
  next(); // Call the next middleware or route handler in the chain.
}

// Use the passwordChecker middleware for all incoming requests
app.use(passwordChecker);

// Define a POST route for the "/check" URL
app.post("/check", (req, res) => {
  // If the user is authorised (password was correct)
  if (authorised === true) {
    // Send the 'secret.html' file located in the 'public' folder as the response
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // If the user is not authorised, send the 'index.html' file again
    res.sendFile(__dirname + "/public/index.html"); // can use res.redirect("/")
  }
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  // Log a message to the console when the server starts successfully
  console.log(`App listening on port ${port}`);
});

// NOTE FOR SELF
// body parser comes by default with express however can still be installed if desired
// instead of app.use(bodyParser.urlencoded({ extended: true }));
// can use app.use(express.urlencoded({ extended: true }))