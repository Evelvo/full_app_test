const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.render('index', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add new item
router.post('/add', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      category: req.body.category
    });

    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Toggle purchased status
router.post('/toggle/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.purchased = !item.purchased;
    await item.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete item
router.post('/delete/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;