"use client";

import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'High-Performance Gaming Mouse',
    vendor: 'GamerGear',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop',
    imageAlt: 'A sleek black gaming mouse with RGB lighting.',
  },
  {
    id: 2,
    name: 'Wireless Noise-Cancelling Headphones',
    vendor: 'AudioPure',
    price: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'A pair of modern white wireless headphones.',
  },
  {
    id: 3,
    name: 'Smart Home Security Camera',
    vendor: 'SecureHome',
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop',
    imageAlt: 'A white smart home security camera.',
  },
  {
    id: 4,
    name: 'Mechanical RGB Keyboard',
    vendor: 'TypeFast',
    price: 6200,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'A mechanical keyboard with colorful RGB backlighting.',
  },
   {
    id: 5,
    name: '4K Ultra HD Action Camera',
    vendor: 'AdvenTour',
    price: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'A compact and durable 4K action camera.',
  },
   {
    id: 6,
    name: 'Modern Smartwatch with Fitness Tracker',
    vendor: 'FitTrack',
    price: 9800,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    imageAlt: 'A stylish smartwatch displaying health metrics.',
  },
   {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    vendor: 'SoundWave',
    price: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    imageAlt: 'A cylindrical portable bluetooth speaker.',
  },
   {
    id: 8,
    name: 'Ergonomic Gaming Chair',
    vendor: 'ComfortZone',
    price: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    imageAlt: 'A black and red ergonomic gaming chair.',
  },
];

export default function FeaturedProducts() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group">
              
              <div className="flex flex-col h-full overflow-hidden">
               
                <div className="relative w-full rounded-lg aspect-square overflow-hidden">
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
                    ৳ {product.price.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
            <Link href="/collections/all">
                <button className="px-8 py-3 bg-gray-800 text-white rounded-full font-bold transition-colors hover:bg-gray-900">
                    View All Products
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
