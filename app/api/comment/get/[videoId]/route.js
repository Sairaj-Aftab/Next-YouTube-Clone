import connectMongoDB from "@/config/database";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

// Get video comments
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const comment = await Comment.find({ videoId: params.videoId }).populate(
      "userId"
    );

    return NextResponse.json({ comment });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
