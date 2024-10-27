const express = require("express");
const {
  addRent,
  getRents,
  getRentById,
  updateRentById,
  deleteRentById,
  avtoMobil_olganlar,
  anyParamsClientInfo,
} = require("../controllers/rent");

const router = express.Router();
router.get("/avto_olgan",avtoMobil_olganlar);
router.get("/anyparam",anyParamsClientInfo);

router.post("/addrent", addRent);
router.get("/", getRents);
router.get("/:id", getRentById);
router.patch("/:id", updateRentById);
router.delete("/:id", deleteRentById);


module.exports = router;
