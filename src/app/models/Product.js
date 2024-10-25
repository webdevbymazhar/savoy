import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  colors: [
    {
      type: String, // Store color names or hex codes as strings
    },
  ],
});

// Ensure the model is only created once
const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;