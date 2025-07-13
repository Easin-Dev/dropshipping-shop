import { connectMongodb } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// --- GET handler: to fetch all products or a single product by ID ---
export async function GET(request) {
  try {
    await connectMongodb();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("_id");

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    } else {
      const products = await Product.find({});
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching products." },
      { status: 500 }
    );
  }
}

// --- POST handler: to create a new product ---
export async function POST(request) {
  try {
    const body = await request.json();
    await connectMongodb();
    await Product.create(body);
    return NextResponse.json(
      { message: "Product created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}

// --- PUT handler: to update a product ---
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("_id");
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required for update." },
        { status: 400 }
      );
    }
    const body = await request.json();
    await connectMongodb();
    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
    });
    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Product updated successfully!", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 }
    );
  }
}

// --- নতুন DELETE হ্যান্ডলার: প্রোডাক্ট ডিলেট করার জন্য ---
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("_id");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required for deletion." },
        { status: 400 }
      );
    }

    await connectMongodb();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product", error: error.message },
      { status: 500 }
    );
  }
}
