const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    birthday: { type: Date, required: true },
    passport: { type: String, required: true, trim: true },
    driver_license: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Client", clientSchema);
