const express = require("express");
const {
  addClient,
  getClient,
  getClientByid,
  clientUpdateById,
  deleteClientById,
} = require("../controllers/client");

const router = express.Router();
router.post("/addclient", addClient);
router.get("/", getClient);
router.get("/:id", getClientByid);
router.patch("/:id", clientUpdateById);
router.delete("/:id", deleteClientById);

module.exports = router;
