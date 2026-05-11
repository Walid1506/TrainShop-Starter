const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    if (process.env.SKIP_DB_CHECK !== 'true') {
      await pool.query('SELECT 1');
    }
    res.json({ status: 'ok', service: 'trainshop-api' });
  } catch (error) {
    res.status(503).json({ status: 'error' });
  }
});

app.get('/about', (req, res) => {
  res.json({ project: "TrainShop Starter", module: "DevOps", objective: "CI/CD" });
});

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// NOUVELLE ROUTE : POST /products avec validation stricte
app.post('/products', async (req, res) => {
  const { name, price_cents } = req.body;

  if (!name || !price_cents) {
    return res.status(400).json({ error: 'name et price_cents sont obligatoires' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price_cents) VALUES ($1, $2) RETURNING *',
      [name, price_cents]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

module.exports = app;