const { errorHandler } = require("../helpers/error_handler");
const Car = require("../schemas/car");
const mongoose = require("mongoose");

const addCar = async (req, res) => {
  try {
    const { car_number, make, model, year, mileage } = req.body;
    const newCar = await Car({
      car_number,
      make,
      model,
      year,
      mileage,
    });
    await newCar.save();
    console.log(newCar);
    res.send({ message: "Added new Car", data: newCar });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCars = async (req, res) => {
  try {
    const newCar = await Car.find();
    res.send(newCar);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCarById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const newCar = await Car.findById(req.params.id);
    if (!newCar) {
      return res.status(400).send({ message: "This carid is not defined" });
    }

    res.send({ message: "OK", data: newCar });
  } catch (error) {
    errorHandler(res, error);
  }
};

const carUpdateById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const id = req.params.id;
    const { car_number, make, model, year, mileage } = req.body;

    const carUpdate = await Car.findByIdAndUpdate(
      id,
      {
        car_number,
        make,
        model,
        year,
        mileage,
      },
      { new: true }
    );

    if (!carUpdate) {
      return res.status(400).send({ ErrorMessage: "This car is not defined" });
    }

    res.send({
      message: "Updated successfully",
      carUpdate,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCarById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }
    const id = req.params.id;
    const deleteCar = await Car.findByIdAndDelete(id);

    if (!deleteCar) {
      return res.status(400).send({ ErrorMessage: "This car is not defined" });
    }

    res.send({
      message: "Deleted succesfuly",
      data: deleteCar,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addCar,
  getCars,
  getCarById,
  carUpdateById,
  deleteCarById,
};
