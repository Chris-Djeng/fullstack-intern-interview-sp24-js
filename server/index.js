const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");


app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

/**
 * This array will represent your database.
 * @type {Array<{name: string, email: string, age: number}>}
 */
const data = require("../data/data.json");

app.use(express.static(path.join(__dirname, "../client")));

// HINT: body-parser needed?

app.get("/api/users", (req, res) => {

  res.json(data)

});



app.post("/api/register", (req, res) => {


  const { name, email, age } = req.body; 

  data.push({ name, email, age });

  
  fs.writeFile("data/data.json", JSON.stringify(data), function(err){
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error occurred while registering user" });
      return; 
    }

    // Send a response back to the client when file write is completed
    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, age },
    });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));



