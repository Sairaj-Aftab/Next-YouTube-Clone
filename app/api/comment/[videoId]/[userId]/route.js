import connectMongoDB from "@/config/database";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";
// Upload Video with userId
export async function POST(request, { params }) {
  try {
    await connectMongoDB();
    const data = await request.json();

    const comment = await Comment.create({
      ...data,
      userId: params.userId,
      videoId: params.videoId,
    });

    return NextResponse.json({ comment });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
