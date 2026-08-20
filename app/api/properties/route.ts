import { NextResponse } from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";


// Handle GET requests to /api/hello
export async function GET() {
     try {
    await connectDB();
    const properties = await Property.find({});
    return NextResponse.json((properties), { status: 200 });
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
