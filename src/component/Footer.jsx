import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="border-t mt-10 py-6 text-center text-sm text-gray-600">
        <div className="flex justify-center">
          <Image
            src="http://zaylio.com/cdn/shop/files/IMG_7837_fdf1f912-f737-4279-bc0b-8166051a6150.jpg?v=1744288937&width=200"
            alt="alt"
            width={200}
            height={200}
          />
        </div>
        <div className="mb-3 flex justify-center">
          <Image
            src="https://phitron.io/assets/payments--ZYUOnm8.png"
            alt="payment methods"
            width={800}
            height={0}
            className="h-6 sm:h-8"
          />
        </div>
        <p>
          © 2025, Zaylio{" "}
          <a href="#" className="hover:underline">
            Privacy policy
          </a>{" "}
          <a href="#" className="hover:underline">
            Contact information
          </a>
        </p>
      </footer>{" "}
    </div>
  );
}
