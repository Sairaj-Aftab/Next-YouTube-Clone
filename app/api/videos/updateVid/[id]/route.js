import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Views counting
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const video = await Video.findById(params.id)

    // const videoUpdate = await Video.findByIdAndUpdate(
    //   params.id,
    //   { ...data, like : video.like.includes(userId) },
    //   { new: true } // Return the updated document
    // );

    return NextResponse.json({ videoUpdate });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
