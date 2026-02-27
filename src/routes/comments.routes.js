const express = require("express");
const router = express.Router();
const controller = require("../controllers/comments.controller");

router.get("/", controller.list);
router.post("/", controller.create);

module.exports = router;