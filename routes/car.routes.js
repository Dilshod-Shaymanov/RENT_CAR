const express = require("express");
const {
  addCar,
  getCars,
  getCarById,
  carUpdateById,
  deleteCarById,
} = require("../controllers/car");
const router = express.Router();
router.post("/addcar", addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.patch("/:id", carUpdateById);
router.delete("/:id", deleteCarById);

module.exports = router;
