import Blog from "@/app/models/Blog"
import dbConnection from "@/config/connectDb"
import { NextResponse } from "next/server"

export async function POST(req) {

    await dbConnection()

    try {
        let {title,category,description} = await req.json()

        if(!title || !category || !description){
            return NextResponse.json({
                message : "Please fill the form correctly"
            })
        }

        let blog = new Blog({title,category,description})
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