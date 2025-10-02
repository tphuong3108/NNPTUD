const express = require('express');
const router = express.Router();
const Role = require('../schemas/Role');

router.post('/', async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const roles = await Role.find({ isDelete: false });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || role.isDelete) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { isDelete: true }, { new: true });
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json({ message: "Role soft-deleted", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
