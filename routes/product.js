const express = require('express');
const router = express.Router();
const product = require('../schemas/product');
const { Response } = require('../utils/responseHandler');
const { Authentication, Authorization } = require('../utils/authHandler');

router.get('/', Authentication, Authorization("USER", "MOD", "ADMIN"), async (req, res) => {
    let data = await product.find({ isDeleted: false }).populate('category');
    Response(res, 200, true, data);
});

router.post('/', Authentication, Authorization("MOD", "ADMIN"), async (req, res) => {
    let newProduct = new product(req.body);
    await newProduct.save();
    Response(res, 201, true, newProduct);
});

router.put('/:id', Authentication, Authorization("MOD", "ADMIN"), async (req, res) => {
    let p = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    Response(res, 200, true, p);
});

router.delete('/:id', Authentication, Authorization("ADMIN"), async (req, res) => {
    await product.findByIdAndUpdate(req.params.id, { isDeleted: true });
    Response(res, 200, true, "Đã xóa sản phẩm");
});

module.exports = router;
