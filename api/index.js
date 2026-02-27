// api/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Field "data" must be a string.' });
    }

    // Convert string to array and sort
    const word = data.split('').sort();

    // Return the response exactly as expected
    return res.status(200).json({ word });
  } catch (err) {
    // Always return JSON in case of unexpected errors
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = app;