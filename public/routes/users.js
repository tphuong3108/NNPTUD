const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { username, fullName } = req.query;
    let filter = { isDelete: false };

    if (username) filter.username = { $regex: username, $options: 'i' };
    if (fullName) filter.fullName = { $regex: fullName, $options: 'i' };

    const users = await User.find(filter).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user || user.isDelete) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username, isDelete: false }).populate("role");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDelete: true }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User soft-deleted", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/activate', async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username, isDelete: false });
    if (!user) return res.status(404).json({ error: "Invalid credentials" });

    user.status = true;
    await user.save();

    res.json({ message: "User activated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
