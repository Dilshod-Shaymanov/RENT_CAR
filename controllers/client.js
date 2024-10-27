const { errorHandler } = require("../helpers/error_handler");
const mongoose = require("mongoose");
const Client = require("../schemas/client");

const addClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birthday,
      passport,
      driver_license,
      address,
      phone,
    } = req.body;
    const newClient = await Client({
      first_name,
      last_name,
      birthday,
      passport,
      driver_license,
      address,
      phone,
    });
    await newClient.save();
    res.send({ message: "Added new client", data: newClient });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getClient = async (req, res) => {
  try {
    const newClient = await Client.find();
    res.send(newClient);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getClientByid = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const newClient = await Client.findById(req.params.id);
    if (!newClient) {
      return res.status(400).send({ message: "This client is not defined" });
    }

    res.send({ message: "OK", data: newClient });
  } catch (error) {
    errorHandler(res, error);
  }
};

const clientUpdateById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const id = req.params.id;
    const {
      first_name,
      last_name,
      birthday,
      passport,
      driver_license,
      address,
      phone,
    } = req.body;

    const clientUpdate = await Client.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        birthday,
        passport,
        driver_license,
        address,
        phone,
      },
      { new: true }
    );

    if (!clientUpdate) {
      return res
        .status(400)
        .send({ ErrorMessage: "This client is not defined" });
    }

    res.send({
      message: "Updated successfully",
      clientUpdate,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteClientById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }
    const id = req.params.id;
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return res
        .status(400)
        .send({ ErrorMessage: "This client is not defined" });
    }

    res.send({
      message: "Deleted succesfuly",
      data: deleteClient,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addClient,
  getClient,
  getClientByid,
  clientUpdateById,
  deleteClientById,
};
