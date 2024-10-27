const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    car_number: { type: String, required: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Car", carSchema);
