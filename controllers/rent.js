const { errorHandler } = require("../helpers/error_handler");
const mongoose = require("mongoose");
const Rent = require("../schemas/rent");
const Price_type = require("../schemas/price_type");
const Car = require("../schemas/car");
const Client = require("../schemas/client");
const rent = require("../schemas/rent");

const addRent = async (req, res) => {
  try {
    const {
      car_id,
      client_id,
      from_datetime,
      to_datetime,
      rent_status_id,
      rent_type_id,
    } = req.body;

    const priceType = await Price_type.findOne({ car_id });
    if (!priceType) {
      return res
        .status(400)
        .send({ message: "Price type not found for this car" });
    }
    // 1-so'rov

    const fromDatetime = new Date(from_datetime);
    const toDatetime = new Date(to_datetime);
    const difference = Math.abs(toDatetime - fromDatetime);

    let total_price = 0;
    const diffDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainTime = difference % (1000 * 60 * 60 * 24);
    const diffHours = Math.ceil(remainTime / (1000 * 60 * 60));
    if (!priceType) {
      return res
        .status(400)
        .send({ message: "Price type not found for this car" });
    }

    // console.log("Umumiy millsekundlar ",difference);
    // console.log("Kunlar ",diffDays);
    // console.log("Qolgan millesekundlar ",remainTime);
    // console.log("Qolgan soatlar ",diffHours);

    if (rent_type_id === 1) {
      total_price =
        diffDays * priceType.price_per_day +
        diffHours * priceType.price_per_hour;
    } else if (rent_type_id === 2) {
      const totalHours = Math.ceil(difference / (1000 * 60 * 60));
      total_price = totalHours * priceType.price_per_hour;
    }

    const newRent = await Rent({
      car_id,
      client_id,
      from_datetime,
      to_datetime,
      rent_status_id,
      rent_type_id,
      total_price,
    });

    await newRent.save();
    res.send({ message: "Added new rent", data: newRent });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getRents = async (req, res) => {
  try {
    const rents = await Rent.find().populate({
      path:"car_id"
    }).populate({
      path:"client_id"
    })
    res.send(rents);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getRentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const rent = await Rent.findById(req.params.id).populate(
      "car_id client_id"
    );
    if (!rent) {
      return res.status(400).send({ message: "This rent is not defined" });
    }

    res.send({ message: "OK", data: rent });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateRentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const id = req.params.id;
    const {
      car_id,
      client_id,
      from_datetime,
      to_datetime,
      rent_status_id,
      rent_type_id,
      total_price,
    } = req.body;

    const rentUpdate = await Rent.findByIdAndUpdate(
      id,
      {
        car_id,
        client_id,
        from_datetime,
        to_datetime,
        rent_status_id,
        rent_type_id,
        total_price,
      },
      { new: true }
    );

    if (!rentUpdate) {
      return res.status(400).send({ ErrorMessage: "This rent is not defined" });
    }

    res.send({ message: "Updated successfully", data: rentUpdate });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteRentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ errormessage: "Incorrect Object id" });
    }

    const rent = await Rent.findByIdAndDelete(req.params.id);
    if (!rent) {
      return res.status(400).send({ ErrorMessage: "This rent is not defined" });
    }

    res.send({ message: "Deleted successfully", data: rent });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Aqilli so'rovlar

// 2 - so'rov

const avtoMobil_olganlar = async (req, res) => {
  try {
    const { car_number, from_datetime, to_datetime } = req.body;
    const avto = await Car.findOne({ car_number });

    if (!avto) {
      return res
        .status(400)
        .send({ message: "Bunday mashina raqami mavjud emas" });
    }
    const rents = await Rent.find({
      car_id: avto._id,
      from_datetime: { $lte: new Date(to_datetime) },
      to_datetime: { $gte: new Date(from_datetime) },
    });

    if (!rents.length) {
      return res.status(404).send({
        message: "Rent mavjud emas",
      });
    }

    const clientsid = rents.map((rent) => rent.client_id);

    const mijozlar = await Client.find({ _id: { $in: clientsid } });
    res.send(mijozlar);
  } catch (error) {
    errorHandler(res, error);
  }
};

// 3-so'rov

// Ijaraga olgan shaxsni berilgan ixtiyori malumoti asosida izlab topish va uning umumiy ijaralar soni va summasini chiqarish so'rovini yozing;

const anyParamsClientInfo = async (req, res) => {
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

    let where = {};

    if (first_name) {
      where.first_name = first_name;
    } else if (last_name) {
      where.last_name = last_name;
    } else if (birthday) {
      where.birthday = birthday;
    } else if (passport) {
      where.passport = passport;
    } else if (driver_license) {
      where.driver_license = driver_license;
    } else if (address) {
      where.address = address;
    } else if (phone) {
      where.phone = phone;
    }

    if (Object.keys(where).length === 0) {
      res.status(400).send({ message: "Hech qanday malumot berilmagan" });
    }

    const newClients = await Client.find(where);
    if (newClients.length === 0) {
      return res.status(404).send({ message: "Shaxs topilmadi" });
    }

    const results = await Promise.all(
      newClients.map(async (client) => {
        const rents = await Rent.find({ client_id: client._id });
        const totalRentals = rents.length;
        const totalAmount = rents.reduce(
          (sum, rent) => sum + rent.total_price,
          0
        );
        return {
          client,
          totalRentals,
          totalAmount,
        };
      })
    );
    res.send(results);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addRent,
  getRents,
  getRentById,
  updateRentById,
  deleteRentById,
  avtoMobil_olganlar,
  anyParamsClientInfo,
};
