const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      title: "Book Review: The Bear & The Nightingale",
    },
    {
      id: "2",
      title: "Game Review: Pokemon Brillian Diamond",
    },
    {
      id: "3",
      title: "Show Review: Alice in Borderland",
    },   
  ]);
});

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
