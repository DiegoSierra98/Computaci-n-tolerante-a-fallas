const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({error: 'username required'});
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json(decoded);
  } catch (e) {
    res.sendStatus(401);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Auth service listening on ${port}`));
