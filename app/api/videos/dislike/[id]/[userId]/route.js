import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Views counting
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const videoId = params.id;
    const userId = params.userId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    return NextResponse.json("The video has been disliked.");
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
