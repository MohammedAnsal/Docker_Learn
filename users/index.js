const express = require("express");

const app = express();

app.get("/data", (req, res) => {
  res.json([
    { name: "Alex", age: 21, gender: "male" },
    { name: "Sona", age: 21, gender: "female" },
    { name: "Bob", age: 21, gender: "male" },
  ]);
});

app.listen(4001, () => {
  console.log("Server listening");
});
