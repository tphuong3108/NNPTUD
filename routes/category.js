const express = require('express');
const router = express.Router();
const category = require('../schemas/category');
const { Response } = require('../utils/responseHandler');
const { Authentication, Authorization } = require('../utils/authHandler');

router.get('/', Authentication, Authorization("USER", "MOD", "ADMIN"), async (req, res) => {
    let data = await category.find({ isDeleted: false });
    Response(res, 200, true, data);
});

router.post('/', Authentication, Authorization("MOD", "ADMIN"), async (req, res) => {
    let newCategory = new category(req.body);
    await newCategory.save();
    Response(res, 201, true, newCategory);
});

router.put('/:id', Authentication, Authorization("MOD", "ADMIN"), async (req, res) => {
    let cat = await category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    Response(res, 200, true, cat);
});

router.delete('/:id', Authentication, Authorization("ADMIN"), async (req, res) => {
    await category.findByIdAndUpdate(req.params.id, { isDeleted: true });
    Response(res, 200, true, "Đã xóa category");
});

module.exports = router;
