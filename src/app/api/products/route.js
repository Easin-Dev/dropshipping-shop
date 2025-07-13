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
      // Fetch a single product if an _id is provided
      const product = await Product.findById(productId);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    } else {
      // Fetch all products if no _id is provided
      const products = await Product.find({});
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching products.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- POST handler: to create a new product ---
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      oldPrice,
      category,
      vendor,
      sku,
      tags,
      imageUrl,
    } = body;

    // Basic validation
    if (!name || !price || !category || !imageUrl) {
      return NextResponse.json(
        {
          message: "Name, Price, Category, and Image URL are required fields.",
        },
        { status: 400 }
      );
    }

    await connectMongodb();

    await Product.create({
      name,
      description,
      price,
      oldPrice,
      category,
      vendor,
      sku,
      tags,
      imageUrl,
      imageAlt: name, // Using product name as image alt text
    });

    return NextResponse.json(
      { message: "Product created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    // Handle unique SKU error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "SKU already exists. Please use a unique SKU." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
