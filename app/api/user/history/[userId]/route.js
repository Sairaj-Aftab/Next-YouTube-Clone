import connectMongoDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

// User Sign Up
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const user = await User.findByIdAndUpdate(
      params.userId,
      {
        history: [],
      },
      { new: true }
    );

    return NextResponse.json({ message: "All history trash" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
