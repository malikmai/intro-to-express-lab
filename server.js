const express = require("express");
const app = express();
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

// Route to greet the user
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  // Sending a personalized greeting
  res.send(`Hello there, Malik!`);
});

// Route to roll the dice
app.get("/roll/:number", (req, res) => {
    const number = parseInt(req.params.number);
    if (!Number.isInteger(number)) {
      res.send("You must specify an integer number.");
    } else {
      const rolledNumber = Math.floor(Math.random() * (number + 1));
      res.send(`You rolled a ${rolledNumber}.`);
    }
  });

// Route for collectibles
app.get("/collectibles/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= collectibles.length || isNaN(index)) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    const collectible = collectibles[index];
    res.send(
      `So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`
    );
  }
});

app.get("/hello", (req, res) => {
  res.send(
    `Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
  );
});

// Route to filter shoes
app.get("/shoes", (req, res) => {
  let filteredShoes = shoes;

  // Filter by min-price query parameter
  if (req.query["min-price"]) {
    const minPrice = parseInt(req.query["min-price"]);
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }

  // Filter by max-price query parameter
  if (req.query["max-price"]) {
    const maxPrice = parseInt(req.query["max-price"]);
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }

  // Filter by type query parameter
  if (req.query.type) {
    const type = req.query.type.toLowerCase();
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }

  res.send(filteredShoes);
});

// Server listening
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
