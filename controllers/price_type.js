const { errorHandler } = require("../helpers/error_handler");
const mongoose = require("mongoose");
const Price_type = require("../schemas/price_type");

const addPriceType = async (req, res) => {
  try {
    const { car_id, price_per_day, price_per_hour, late_fee_per_hour } =
      req.body;
    const newPriceType = await Price_type({
      car_id,
      price_per_day,
      price_per_hour,
      late_fee_per_hour,
    });

    await newPriceType.save();
    res.send({ message: "Added new price type", data: newPriceType });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPriceTypes = async (req, res) => {
  try {
    const priceTypes = await Price_type.find().populate("car_id");
    res.send(priceTypes);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPriceTypeById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const priceType = await Price_type.findById(req.params.id).populate(
      "car_id"
    );
    if (!priceType) {
      return res
        .status(400)
        .send({ message: "This price type is not defined" });
    }

    res.send({ message: "OK", data: priceType });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updatePriceTypeById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const id = req.params.id;
    const { car_id, price_per_day, price_per_hour, late_fee_per_hour } =
      req.body;

    const priceTypeUpdate = await Price_type.findByIdAndUpdate(
      id,
      {
        car_id,
        price_per_day,
        price_per_hour,
        late_fee_per_hour,
      },
      { new: true }
    );

    if (!priceTypeUpdate) {
      return res
        .status(400)
        .send({ ErrorMessage: "This price type is not defined" });
    }

    res.send({ message: "Updated successfully", data: priceTypeUpdate });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletePriceTypeById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const priceType = await Price_type.findByIdAndDelete(req.params.id);
    if (!priceType) {
      return res
        .status(400)
        .send({ ErrorMessage: "This price type is not defined" });
    }

    res.send({ message: "Deleted successfully", data: priceType });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addPriceType,
  getPriceTypes,
  getPriceTypeById,
  updatePriceTypeById,
  deletePriceTypeById,
};
