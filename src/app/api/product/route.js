import Product from "@/app/models/Product";
import dbConnection from "@/config/connectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnection();
    try {
        let { title, image, price, stock, category, description } = await req.json();
        if (!title || !image || !price || !stock || !category || !description) {
            return NextResponse.json({
                message: "Please fill all the credentials",
            }, { status: 400 });
        }

        let newProduct = new Product({
            title, image, price, stock, category, description
        });
        await newProduct.save();

        return NextResponse.json({
            message: "Product successfully saved"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message // Return only the error message
        }, { status: 400 });
    }
}