// app/api/orders/route.js
import Order from "@/app/models/Order"
import dbConnection from "@/config/connectDb"
import { NextResponse } from "next/server"

export async function POST(req) {
    await dbConnection()
    try {
        const {
            customerId,
            items,
            shippingAddress,
            billingAddress,
            shippingMethod,
            shippingCost,
            paymentMethod,
            subtotal,
            tax,
            total
        } = await req.json()

        // Validation
        if (!items || !shippingAddress || !shippingMethod || !paymentMethod) {
            return NextResponse.json({
                message: "Missing required order information"
            }, { status: 400 })
        }

        // Create new order
        const order = new Order({
            customerId,
            items,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            shippingMethod,
            shippingCost,
            paymentMethod,
            subtotal,
            tax,
            total,
            status: "pending",
            paymentStatus: paymentMethod === "cod" ? "pending" : "processing"
        })

        const newOrder = await order.save()

        return NextResponse.json({
            order: newOrder,
            message: "Order placed successfully"
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 })
    }
}

export async function GET(req) {
    await dbConnection();
    
    try {
        const { searchParams } = new URL(req.url);
        const customerId = searchParams.get('customerId');
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit')) || 0;
        
        let query = {};
        
        if (customerId) {
            query.customerId = customerId;
        }
        
        if (status) {
            query.status = status;
        }
        
        let orders;
        if (limit > 0) {
            orders = await Order.find(query).sort({ createdAt: -1 }).limit(limit);
        } else {
            orders = await Order.find(query).sort({ createdAt: -1 });
        }
        
        return NextResponse.json({
            orders
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}