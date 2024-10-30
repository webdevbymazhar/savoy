import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params; // Retrieve 'id' from route parameters

  try {
    const product = await Product.findById(id); // Use 'findById' for a single document query
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function PUT(request,{params}) {
    const { id } = params;
    
    try {
        let body = await request.json()
        let product = await Product.findByIdAndUpdate(id,body,{new:true})
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message : error.message }, { status: 400 });
    }
    
}
