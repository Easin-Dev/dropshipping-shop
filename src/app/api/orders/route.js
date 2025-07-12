import { connectMongodb } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { contactInfo, shippingAddress, paymentMethod, items, totalPrice } =
      await request.json();

    await connectMongodb();

    // নতুন অর্ডার তৈরি করুন
    await Order.create({
      contactInfo,
      shippingAddress,
      paymentMethod,
      items,
      totalPrice,
    });

    return NextResponse.json(
      { message: "Order placed successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      {
        message: "An error occurred while placing the order.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
