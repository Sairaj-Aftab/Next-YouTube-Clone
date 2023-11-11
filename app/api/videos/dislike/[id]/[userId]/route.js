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

    if (video.dislikes.includes(userId)) {
      const videoUpdate = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            dislikes: userId,
          },
        },
        { new: true }
      );
      return NextResponse.json({ videoUpdate });
    }
    if (!video.dislikes.includes(userId)) {
      const videoUpdate = await Video.findByIdAndUpdate(
        videoId,
        {
          $push: { dislikes: userId },
          $pull: { likes: video.likes.includes(userId) && userId },
        },
        { new: true }
      );
      return NextResponse.json({ videoUpdate });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
