import Blog from "@/app/models/Blog"
import dbConnection from "@/config/connectDb"
import { NextResponse } from "next/server"

export async function POST(req) {

    await dbConnection()

    try {
        let {title,category,description,image,author} = await req.json()

        if(!title || !category || !description || !image || !author){
            return NextResponse.json({
                message : "Please fill the form correctly"
            })
        }

        let blog = new Blog({title,category,description,image,author})
        let newblog = await blog.save()

        return NextResponse.json({
            newblog
        },{status:200})


    } catch (error) {

        console.log(error);
        
        return NextResponse.json({
            message : error.message
        },{status:400})

    }
    
}


export async function GET(req) {
    await dbConnection();

    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 0; 

        let blogs;
        if (limit > 0) {
            blogs = await Blog.find().sort({ createdAt: -1 }).limit(limit);
        } else {
            blogs = await Blog.find().sort({ createdAt: -1 });
        }

        return NextResponse.json({
            blogs
        }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            message: error.message
        }, { status: 400 });
    }
}


