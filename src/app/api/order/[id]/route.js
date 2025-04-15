// app/api/orders/[id]/route.js
import Order from "@/app/models/Order";
import dbConnection from "@/config/connectDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await dbConnection();
    
    try {
        const id = params.id;
        const order = await Order.findById(id);
        
        if (!order) {
            return NextResponse.json({
                message: "Order not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            order
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await dbConnection();
    
    try {
        const id = params.id;
        const updates = await req.json();
        
        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!updatedOrder) {
            return NextResponse.json({
                message: "Order not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            order: updatedOrder,
            message: "Order updated successfully"
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}