var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product')



/* GET users listing. */
router.get('/', async function(req, res, next) {
  let products = await productModel.find({})
  res.send(products);
});
router.get('/:id', function(req, res, next) {
  res.send(comments.filter(c=>c.id==req.params.id));
});

module.exports = router;
