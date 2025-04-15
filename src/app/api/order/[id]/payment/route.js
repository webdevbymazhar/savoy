// app/api/orders/[id]/payment/route.js
import Order from "@/app/models/Order";
import dbConnection from "@/config/connectDb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    await dbConnection();
    
    try {
        const id = params.id;
        const { paymentStatus } = await req.json();
        
        if (!paymentStatus) {
            return NextResponse.json({
                message: "Payment status is required"
            }, { status: 400 });
        }
        
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { paymentStatus, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!updatedOrder) {
            return NextResponse.json({
                message: "Order not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            order: updatedOrder,
            message: "Payment status updated successfully"
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}