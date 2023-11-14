import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Get all videos
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.find({ _id: { $ne: params.id } })
      .sort({ views: -1 })
      .populate("userId");

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
