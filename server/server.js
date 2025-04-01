const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

const jsonData = JSON.parse(fs.readFileSync('./server/sampledata.json', 'utf-8'));

app.get('/products', (req, res) => {
  res.json(jsonData.products);
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = jsonData.products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});


app.get('/orders', (req, res) => {
  const userId = req.query.user_id;
  const userOrders = jsonData.orders.filter((order) => order.user_id === parseInt(userId));
  res.json(userOrders);
});

app.get('/categories', (req, res) => {
  res.json(jsonData.categories);
});

app.get('/tags', (req, res) => {
  res.json(jsonData.tags);
});

app.post('/orders', (req, res) => {
  const newOrder = req.body; 
  jsonData.orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});