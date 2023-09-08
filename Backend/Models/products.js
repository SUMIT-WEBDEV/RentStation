const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    location: {
      type: String,
      required: false,
    },

    price: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: false,
    },

    duration: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: false,
    },

    Image: {
      type: Array,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
