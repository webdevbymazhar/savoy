import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import Admin from "../../../models/Admin";
import dbConnection from "@/config/connectDb";

export async function POST(req) {
    await dbConnection()
    try {
        // Parse the request body
        const { email, password } = await req.json();

        // Check if email is provided
        if (!email || !password) {
            return NextResponse.json({
                message: "Email and password are required"
            }, { status: 400 });
        }

        // Check if the email already exists
        const foundEmail = await Admin.findOne({ email });
        if (foundEmail) {
            return NextResponse.json({
                message: "Email already exists, please log in"
            }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new Admin({
            email,
            password: hashedPassword // Store the hashed password
        });

        // Save the new admin user to the database
        await newAdmin.save();

        return NextResponse.json({
            message: "Admin created successfully"
        }, { status: 201 }); // Use status 201 for resource creation
    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}