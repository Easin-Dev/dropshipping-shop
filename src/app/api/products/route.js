import { NextResponse } from 'next/server';

import { allProducts } from '@/data/products'; 

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = allProducts.find(p => p.id === parseInt(id));
      
      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json(allProducts);
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
