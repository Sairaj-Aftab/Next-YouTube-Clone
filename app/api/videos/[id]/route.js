import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextRequest, NextResponse } from "next/server";

// GET Single Video
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.findById(params.id);

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
