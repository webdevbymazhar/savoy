// app/api/orders/[id]/status/route.js
import Order from "@/app/models/Order";
import dbConnection from "@/config/connectDb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    await dbConnection();
    
    try {
        const id = params.id;
        const { status } = await req.json();
        
        if (!status) {
            return NextResponse.json({
                message: "Status is required"
            }, { status: 400 });
        }
        
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!updatedOrder) {
            return NextResponse.json({
                message: "Order not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            order: updatedOrder,
            message: "Order status updated successfully"
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}