import Product from "@/app/models/Product";
import dbConnection from "@/config/connectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnection();
    try {
        let { title, image, price, stock, category, description, colors } = await req.json();
        if (!title || !image || !price || !stock || !category || !description) {
            return NextResponse.json({
                message: "Please fill all the credentials",
            }, { status: 400 });
        }

        let newProduct = new Product({
            title, image, price, stock, category, description, colors
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

export async function GET(req) {
    dbConnection();

    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 0; 

        let products;
        if (limit > 0) {
            products = await Product.find().sort({ createdAt: -1 }).limit(limit);
        } else {
            products = await Product.find().sort({ createdAt: -1 });
        }

        return NextResponse.json({
            products
        }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            message: error.message 
        }, { status: 400 });
    }
}
