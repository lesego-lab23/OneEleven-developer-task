const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const { data } = req.body;

  if (typeof data !== 'string') {
    return res.status(400).json({ error: 'Field "data" must be a string.' });
  }

  const word = data.split('').sort().filter(c => c.trim() !== '');
  return res.status(200).json({ word });
});

module.exports = app;