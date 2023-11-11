import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// Views counting
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const videoId = params.id;
    const userId = params.userId;

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ message: "Video not found" });
    }

    if (video.likes.includes(userId)) {
      const videoUpdate = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            likes: userId,
            dislikes: video.dislikes.includes(userId) && userId,
          },
        },
        { new: true }
      );
      return NextResponse.json({ videoUpdate });
    }
    if (!video.likes.includes(userId)) {
      const videoUpdate = await Video.findByIdAndUpdate(
        videoId,
        {
          $push: { likes: userId },
          $pull: { dislikes: video.dislikes.includes(userId) && userId },
        },
        { new: true }
      );
      return NextResponse.json({ videoUpdate });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
