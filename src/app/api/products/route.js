// src/app/api/products/route.js

import { NextResponse } from "next/server";
import { allProducts } from "@/data/products";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("_id");

    if (productId) {
      const product = allProducts.find((p) => p._id === productId);

      if (product) {
        return NextResponse.json(product, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Product not found." },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(allProducts, { status: 200 });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "An error occurred.", error: error.message },
      { status: 500 }
    );
  }
}
