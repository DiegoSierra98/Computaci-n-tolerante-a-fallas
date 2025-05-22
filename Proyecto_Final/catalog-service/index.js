const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Producto A' },
  { id: 2, name: 'Producto B' }
];

app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
  const { name } = req.body;
  const product = { id: Date.now(), name };
  products.push(product);
  res.status(201).json(product);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Catalog service listening on ${port}`));
