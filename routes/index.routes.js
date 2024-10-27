const express = require("express");
const indexRouter = express.Router();
const car = require("./car.routes");
const client = require("./client.routes");
const rent = require("./rent.routes");
const price = require("./price_type.routes");

indexRouter.use("/car", car);
indexRouter.use("/client", client);
indexRouter.use("/rent", rent);
indexRouter.use("/price", price);

module.exports = indexRouter;
