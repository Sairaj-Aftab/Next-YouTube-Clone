import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Views counting
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const videoId = params.id;
    const userId = params.userId;

    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      },
      { new: true }
    );
    return NextResponse.json("The video has been liked.");
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
