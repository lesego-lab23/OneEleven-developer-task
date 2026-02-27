const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// POST endpoint: receives { data: "string" }, returns { word: [...sorted chars] }
app.post('/', (req, res) => {
  const { data } = req.body;

  if (typeof data !== 'string') {
    return res.status(400).json({ error: 'Field "data" must be a string.' });
  }

  const word = data.split('').sort().filter(c => c.trim() !== '');

  return res.status(200).json({ word });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;