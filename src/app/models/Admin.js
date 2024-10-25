import mongoose from "mongoose";

let AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin