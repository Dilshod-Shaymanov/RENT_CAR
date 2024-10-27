const { Schema, model } = require("mongoose");

const rentSchema = new Schema(
  {
    car_id: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    client_id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    from_datetime: { type: Date, default: Date.now },
    to_datetime: { type: Date },
    rent_status_id: {
      type: String,
      enum: {
        values: ["Started", "Finished"],
        message: "{VALUE} is not a valid rent status",
      },
      required: true,
    },
    rent_type_id: {
      type: Number,
      enum: { values: [1, 2], message: "{VALUE} is not a valid rent type" },
      required: true,
    },
    total_price: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Rent", rentSchema);
