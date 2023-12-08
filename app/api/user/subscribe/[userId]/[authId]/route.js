import connectMongoDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

// User Edit Profile
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const user = await User.findByIdAndUpdate(
      params.userId,
      { $pull: { subscribers: params.authId } },
      { $addToSet: { subscribers: params.authId } },
      { new: true }
    );
    const authUser = await User.findByIdAndUpdate(
      params.authId,
      { $pull: { subscribedUsers: params.userId } },
      { $addToSet: { subscribedUsers: params.userId } },
      { new: true }
    );

    return NextResponse.json({ message: "Subscribed" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
