import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});


let Product = new mongoose.model("products",productSchema)

export default Product