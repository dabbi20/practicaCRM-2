const express = require("express");
const controller = require("../controllers/clients.controller");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.delete("/:id", controller.remove);
router.patch("/:id/contacted", controller.patchContacted);
router.patch("/:id", controller.patchUpdate);

module.exports = router;