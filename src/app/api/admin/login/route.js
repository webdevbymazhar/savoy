import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../../../models/Admin'; // Ensure this import points to your actual Admin model
import dbConnection from '@/config/connectDb';

const JWT_SECRET = process.env.JWT_SECRET ; // Use environment variable for secret key

export async function POST(req) {
    await dbConnection()
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Fetch user from database
        const user = await Admin.findOne({ email }); // Replace with your actual user-fetching logic

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ token });
    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}