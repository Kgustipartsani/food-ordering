const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Route untuk cek server berjalan
app.get('/', (req, res) => res.send('Server is running'));

// Endpoint untuk mengambil semua menu makanan
app.get('/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menus:', err.message);
    res.status(500).send('Database Error');
  }
});

// Endpoint untuk menambahkan menu baru
app.post('/menu', async (req, res) => {
  const { food_name, price, image_url, description, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menus (food_name, price, image_url, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [food_name, price, image_url, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating menu item:', err.message);
    res.status(500).send('Database Error');
  }
});

// Endpoint untuk memperbarui menu berdasarkan ID
app.put('/menu/:id', async (req, res) => {
  const { id } = req.params;
  const { food_name, price, image_url, description, category } = req.body;

  try {
    const result = await pool.query(
      'UPDATE menus SET food_name = $1, price = $2, image_url = $3, description = $4, category = $5 WHERE id = $6 RETURNING *',
      [food_name, price, image_url, description, category, id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    console.error('Error updating menu item:', err.message);
    console.error('Full Error:', err);
    res.status(500).send('Database Error');
  }
});

// Endpoint untuk menghapus menu berdasarkan ID
app.delete('/menu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM menus WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length > 0) {
      res.status(200).send('Menu deleted successfully');
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    console.error('Error deleting menu item:', err.message);
    res.status(500).send('Database Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
