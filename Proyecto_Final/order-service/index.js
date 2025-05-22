const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let orders = [];

app.post('/orders', async (req, res) => {
  const { productId } = req.body;
  try {
    const response = await axios.get('http://catalog-service:3000/products');
    const product = response.data.find(p => p.id == productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    const order = { id: Date.now(), productId, created: new Date() };
    orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Servicio de catálogo no disponible' });
  }
});

app.get('/orders', (req, res) => res.json(orders));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Order service listening on ${port}`));
