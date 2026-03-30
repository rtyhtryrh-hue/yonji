const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'My CI/CD App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Пример API с параметрами
app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Invalid name' });
  }
  res.json({ message: `Hello, ${name}!` });
});

// POST endpoint
app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;