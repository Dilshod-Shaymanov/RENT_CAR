const express = require("express");
const {
  addPriceType,
  getPriceTypes,
  getPriceTypeById,
  updatePriceTypeById,
  deletePriceTypeById,
} = require("../controllers/price_type");

const router = express.Router();
router.post("/addprice", addPriceType);
router.get("/", getPriceTypes);
router.get("/:id", getPriceTypeById);
router.patch("/:id", updatePriceTypeById);
router.delete("/:id", deletePriceTypeById);

module.exports = router;
