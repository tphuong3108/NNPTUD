const express = require('express');
const router = express.Router();
const Category = require('../schemas/category');

router.get('/', async (req, res) => {
  const cats = await Category.find();
  res.send({ success: true, data: cats });
});

router.get('/:id', async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).send({ success: false, message: "Not found" });
    res.send({ success: true, data: cat });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCat = new Category({ name: req.body.name });
    await newCat.save();
    res.send({ success: true, data: newCat });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.send({ success: true, data: updated });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

module.exports = router;
