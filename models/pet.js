const { Schema, model } = require("mongoose");

const PetSchema = Schema(
  {
    breed: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Pet", PetSchema, "pets");
