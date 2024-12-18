const { default: mongoose } = require("mongoose");


let blogSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        unique:true
    },
    category : {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image : {
        type:String
    },
    author : {
        type:String,
        required:true
    }
},{timestamps:true})

const Blog = mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);
export default Blog