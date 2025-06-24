"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <Link
          href={`/all_products/${product.id}`}
          key={product.id}
          className="group"
        >
          <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.imageAlt}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-gray-500">{product.vendor}</p>
              <h3 className="mt-1 font-semibold text-gray-800 flex-grow transition-colors group-hover:text-blue-600">
                <span className="bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300">
                  {product.name}
                </span>
              </h3>
              <p className="mt-2 font-bold text-lg text-blue-600">
                ৳ {product.price.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
