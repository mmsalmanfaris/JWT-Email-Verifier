import 'dotenv/config';
import express from 'express';
import { verifyEmailToken } from '../src/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Email verifier dev server. Use /verify?token=...');
});

app.get('/verify', (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send('Missing token query parameter');

  try {
    const payload = verifyEmailToken(token);
    res.send(`Email verified: ${payload.email}`);
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
});

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
