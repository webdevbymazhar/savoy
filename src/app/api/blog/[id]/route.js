
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";


export async function GET(req,{params}) {

    try {

        let id = params.id

        let blog = await Blog.findById(id)

        return NextResponse.json({
            blog
        },{status:200})


        
    } catch (error) {
        return NextResponse.json({
            message : error.message
        },{status:200})
    }
    
}