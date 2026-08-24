import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const properties = await Property.findById(id).lean();
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
