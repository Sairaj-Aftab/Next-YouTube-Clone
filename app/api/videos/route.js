import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import makeSlug from "@/utils/makeSlug";
import tagMake from "@/utils/tagMake";
import { NextResponse } from "next/server";

// Get all videos
export async function GET(request) {
  try {
    await connectMongoDB();

    const video = await Video.find().populate("userId");

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
      slug: makeSlug(data.title),
      tags,
    });

    return NextResponse.json({ video, message: "Successfully uploaded" });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({ error: error.message });
  }
}
