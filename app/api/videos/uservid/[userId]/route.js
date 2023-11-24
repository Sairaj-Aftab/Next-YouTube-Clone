import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextRequest, NextResponse } from "next/server";

// Get single user video
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.find({ userId: params.userId }).populate(
      "userId"
    );

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
