const express = require('express');
const router = express.Router();

module.exports = (Product) => {
  router.post('/', async (req, res) => {
    const { title, price, description, category, image, rating } = req.body;
    
    try {
      // Automatically increment the id if not provided
      if (!req.body.id) {
        const lastProduct = await Product.findOne().sort({ id: -1 }).exec();
        const newId = (lastProduct ? lastProduct.id : 0) + 1;
        req.body.id = newId;
      }

      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error saving the product:', error);
      res.status(500).json({ error: 'Error saving the product' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const products = await Product.find().sort({ id: 1 }).exec();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  return router;
};
