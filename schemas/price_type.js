const { Schema, model } = require("mongoose");

const priceSchema = new Schema(
  {
    car_id: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    price_per_day: { type: Number, required: true },
    price_per_hour: { type: Number, required: true },
    late_fee_per_hour: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Price_type", priceSchema);
