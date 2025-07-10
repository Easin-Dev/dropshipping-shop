import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();
    console.log("role:", role);
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongodb();
    const userCreate = await User.create({
      name,
      email,
      userRole: role,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User Register." }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while register the user" },
      { status: 50 }
    );
  }
}
