import { connectMongodb } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

// --- GET হ্যান্ডলার: সব অর্ডার অথবা একটি নির্দিষ্ট অর্ডার আনার জন্য ---
export async function GET(request) {
  try {
    await connectMongodb();

    // URL theke search parameters nin
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("_id");

    if (orderId) {
      // Jodi ekta _id deya thake, tahole shudhu shei order-ti khujun
      const order = await Order.findById(orderId);

      if (!order) {
        return NextResponse.json(
          { message: "Order not found." },
          { status: 404 }
        );
      }

      // Shudhu shei order-ti pathan
      return NextResponse.json(order, { status: 200 });
    } else {
      // Jodi kono _id na deya thake, tahole shob order anben
      // .sort({ createdAt: -1 }) babohar kore notun order-gulo aage dekhano hobe
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return NextResponse.json(orders, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Jodi kono error hoy, tahole error message pathan
    return NextResponse.json(
      {
        message: "An error occurred while fetching orders.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- আপনার আগের POST হ্যান্ডলার: নতুন অর্ডার তৈরি করার জন্য ---
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
