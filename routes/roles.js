var express = require('express');
var router = express.Router();
let roleSchema = require('../schemas/roles');
let { Response } = require('../utils/responseHandler');

router.get('/', async function (req, res, next) {
  try {
    let roles = await roleSchema.find({ isDeleted: false });
    Response(res, 200, true, roles);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let role = await roleSchema.findById(req.params.id);
    if (!role) return Response(res, 404, false, "Không tìm thấy role");
    Response(res, 200, true, role);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newRole = new roleSchema({
      name: req.body.name,
      description: req.body.description
    });
    await newRole.save();
    Response(res, 201, true, newRole);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

module.exports = router;
