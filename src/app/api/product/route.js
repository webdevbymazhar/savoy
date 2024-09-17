import Product from "@/app/models/Product";
import dbConnection from "@/config/connectDb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnection()
    try {
        let {title,image,price} = await req.json()
        let newProduct = new Product({
            title,image,price
        })
        await newProduct.save()

        return NextResponse.json({
            message : "Product sucessfully saved"
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            message : error
        },{status:400})
    }
}