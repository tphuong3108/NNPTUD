const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const users = require("../schemas/users");
const roles = require("../schemas/roles");
const { Response } = require("../utils/responseHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

router.get("/", async function (req, res) {
  try {
    const allUsers = await users.find({ isDeleted: false }).populate({
      path: "role",
      select: "name",
    });
    Response(res, 200, true, allUsers);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const getUser = await users.findById(req.params.id);
    if (!getUser || getUser.isDeleted)
      return Response(res, 404, false, "Không tìm thấy người dùng");
    Response(res, 200, true, getUser);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const role = req.body.role ? req.body.role : "USER";
    const roleData = await roles.findOne({ name: role });
    if (!roleData) return Response(res, 404, false, "Role không hợp lệ");

    const newUser = new users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: roleData._id,
    });
    await newUser.save();
    Response(res, 201, true, newUser);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return Response(res, 404, false, "Không tìm thấy người dùng");

    user.email = req.body.email || user.email;
    user.fullName = req.body.fullName || user.fullName;
    user.password = req.body.password || user.password;
    await user.save();

    Response(res, 200, true, user);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file được tải lên" });
  }
  const imagePath = `/images/${req.file.filename}`;
  res.status(200).json({
    message: "Upload avatar thành công",
    imageUrl: imagePath,
  });
});

module.exports = router;
