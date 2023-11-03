import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import tagMake from "@/utils/tagMake";
import { NextResponse } from "next/server";

// Get all videos
export async function GET(request) {
  try {
    await connectMongoDB();

    const video = await Video.find();

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Upload Video with userId
export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const tags = tagMake(data.tags);

    const video = await Video.create({
      ...data,
      tags,
    });

    return NextResponse.json({ video, message: "Successfully uploaded" });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({ error: error.message });
  }
}
