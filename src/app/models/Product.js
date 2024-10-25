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
  image: [
    {type:String}
  ],
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default:0
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});


let Product = mongoose.models.products || mongoose.model("products",productSchema)

export default Product