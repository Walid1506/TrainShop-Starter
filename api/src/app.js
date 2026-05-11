const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const serviceName = 'trainshop-api';
const version = process.env.APP_VERSION || 'dev';
const environment = process.env.NODE_ENV || 'development';

app.get('/about', (req, res) => {
  res.json({
    project: 'TrainShop Starter',
    module: 'DevOps',
    objective: 'Créer une CI GitHub Actions'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur TrainShop Starter',
    endpoints: ['/health', '/ready', '/products']
  });
});

// Healthcheck simple : vérifie que l'application répond
app.get('/health', (req, res) => {
  console.log('Healthcheck appelé');

  res.json({
    status: 'ok',
    service: serviceName,
    version,
    environment,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Readiness check : vérifie que l'application est prête à recevoir du trafic
app.get('/ready', async (req, res) => {
  console.log('Readiness check appelé');

  try {
    await pool.query('SELECT 1');

    res.json({
      status: 'ready',
      service: serviceName,
      version,
      environment,
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Readiness check échoué:', error.message);

    res.status(503).json({
      status: 'not_ready',
      service: serviceName,
      version,
      environment,
      database: 'unavailable',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/products', async (req, res) => {
  console.log('GET /products');

  try {
    const result = await pool.query(
      'SELECT id, name, description, price_cents, stock FROM products ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /products:', error.message);

    res.status(500).json({
      error: 'Impossible de récupérer les produits',
      message: error.message
    });
  }
});

app.get('/products/:id', async (req, res) => {
  console.log(`GET /products/${req.params.id}`);

  try {
    const result = await pool.query(
      'SELECT id, name, description, price_cents, stock FROM products WHERE id = $1',
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Produit introuvable'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Erreur GET /products/${req.params.id}:`, error.message);

    res.status(500).json({
      error: 'Impossible de récupérer le produit',
      message: error.message
    });
  }
});

app.post('/products', async (req, res) => {
  console.log('POST /products');

  try {
    const { name, description, price_cents, stock } = req.body;

    if (!name || !description || price_cents <= 0 || stock < 0) {
      return res.status(400).json({
        error: 'Produit invalide'
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price_cents, stock)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, description, price_cents, stock`,
      [name, description, price_cents, stock || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur POST /products:', error.message);

    res.status(500).json({
      error: 'Impossible de créer le produit',
      message: error.message
    });
  }
});

module.exports = app;