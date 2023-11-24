import connectMongoDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

// User Edit Profile
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const user = await User.findByIdAndUpdate(
      params.id,
      { ...data },
      { new: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
