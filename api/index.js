const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/sort", (req, res) => {
  const { data } = req.body;

  if (typeof data !== "string") {
    return res.status(400).json({ error: "Field 'data' must be a string." });
  }

  const word = data.split("").sort().join("");

  return res.status(200).json({ word: word.split("") });
});

module.exports = app;