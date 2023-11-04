import connectMongoDB from "@/config/database";
import Video from "@/models/video";
import { NextResponse } from "next/server";

// GET Single Video
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } }, // Increment the views field by 1
      { new: true } // Return the updated document
    );

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Delete Single Video
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Successfully deleted", video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
// GET Single Video
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const video = await Video.findById(params.id);

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
