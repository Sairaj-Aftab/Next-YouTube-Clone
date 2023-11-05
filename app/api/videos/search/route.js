import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Get all videos
export async function POST(request) {
  try {
    await connectMongoDB();
    const { search } = await request.json();

    const video = await Video.find({
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $elemMatch: { $regex: new RegExp(search, "i") } } },
      ],
    }).populate("userId");

    if (video.length < 1) {
      return NextResponse.json({ message: "There is no related video" });
    } else {
      return NextResponse.json({ video });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
