import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongodb();
    const { email } = await req.json();
    console.log(email);
    const user = await User.findOne({ email }).select("_id");
    console.log("User: ", user);
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
  }
}
