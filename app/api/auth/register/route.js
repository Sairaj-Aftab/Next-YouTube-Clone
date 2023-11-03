import connectMongoDB from "@/config/database";
import User from "@/models/user";
import { hashPassword } from "@/utils/hashComPass";
import { NextResponse } from "next/server";

// User Sign Up
export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const usedEmail = await User.findOne({ email: data.email });
    if (usedEmail) {
      return NextResponse.json({ message: "Email already exist" });
    }
    const user = await User.create({
      ...data,
      password: hashPassword(data.password),
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
