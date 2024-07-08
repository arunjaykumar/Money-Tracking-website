// Import the required modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Create an instance of the express application
const app = express();

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use body-parser middleware to parse URL-encoded data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Connect to MongoDB using mongoose
mongoose.connect("mongodb://0.0.0.0:27017/MoneyList");
var db = mongoose.connection;

// Handle connection errors
db.on("error", () => console.log("Error in connecting to the Database"));

// Log successful connection
db.once("open", () => console.log("Connected to Database"));

// Handle POST requests to the "/add" route
app.post("/add", (req, res) => {
  // Extract data from the request body
  var category_select = req.body.category_select;
  var amount_input = req.body.amount_input;
  var info = req.body.info;
  var date_input = req.body.date_input;

  // Create a data object with the extracted data
  var data = {
    Category: category_select,
    Amount: amount_input,
    Info: info,
    Date: date_input,
  };

  // Insert the data into the "users" collection
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });
});

// Handle GET requests to the root route
app
  .get("/", (req, res) => {
    // Set headers to allow cross-origin requests
    res.set({
      "Allow-access-Allow-Origin": "*",
    });

    // Redirect the client to "index.html"
    return res.redirect("index.html");
  })
  // Start the server and listen on port 5000
  .listen(5000);

// Log a message indicating the server is listening
console.log("Listening on port 5000");
