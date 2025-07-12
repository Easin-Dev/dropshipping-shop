"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Star, Heart, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/cartContext'; // Cart context import korun

// --- Loading Skeleton Component ---
const ProductDetailsSkeleton = () => (
    <div className="container mx-auto px-4 py-8 md:py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
                <div className="relative w-full aspect-square rounded-lg bg-gray-300 mb-4"></div>
                <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-md bg-gray-300"></div>
                    <div className="w-24 h-24 rounded-md bg-gray-300"></div>
                    <div className="w-24 h-24 rounded-md bg-gray-300"></div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="space-y-3"><div className="h-4 bg-gray-300 rounded w-full"></div><div className="h-4 bg-gray-300 rounded w-full"></div><div className="h-4 bg-gray-300 rounded w-5/6"></div></div>
                <div className="mt-8 pt-8 border-t border-gray-200"><div className="h-12 bg-gray-300 rounded w-full"></div></div>
            </div>
        </div>
    </div>
);

export default function ProductDetailsPage({ params }) {
    const { _id } = params;
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    // Context theke addToCart function nin
    const { addToCart } = useCart();

    useEffect(() => {
        if (!_id) return;
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/products?_id=${_id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                setProduct(data);
                setMainImage(data.imageUrl);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [_id]);
    
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    // ADD TO CART button er jonno function
    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000); // 3 second por success message chole jabe
    };

    if (isLoading) return <ProductDetailsSkeleton />;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found!</div>;
    
    const imageGallery = [product.imageUrl, 'https://images.unsplash.com/photo-1593305842137-758b974a279c?q=80&w=1964&auto=format&fit=crop', 'https://images.unsplash.com/photo-1593305842137-758b974a279c?q=80&w=1964&auto=format&fit=crop'];

  return (
    <div className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Image Section */}
                <div>
                    <div className="relative w-full aspect-square rounded-lg border border-gray-200 overflow-hidden mb-4">
                        <Image src={mainImage} alt={product.name} fill className="object-contain p-4"/>
                         <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</div>
                    </div>
                    <div className="flex gap-4">
                        {imageGallery.map((img, idx) => (
                             <div key={idx} className={`relative w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setMainImage(img)}>
                                <Image src={img} alt={`${product.name} thumbnail ${idx+1}`} fill className="object-cover"/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}</div>
                        <span className="text-sm text-gray-500">(5 Reviews)</span>
                        <span className="text-sm font-semibold text-green-600">In Stock</span>
                    </div>
                    <div className="flex items-end gap-3 mt-4">
                        <p className="font-extrabold text-3xl text-blue-600">৳ {product.price.toLocaleString('en-US')}</p>
                        {product.oldPrice && <p className="text-xl text-gray-400 line-through">৳ {product.oldPrice.toLocaleString('en-US')}</p>}
                    </div>
                    <ul className="mt-6 text-gray-600 list-disc list-inside space-y-2">
                       <li>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</li>
                       <li>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</li>
                    </ul>
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => handleQuantityChange(-1)} className="px-4 py-3"><Minus size={16}/></button>
                                <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="px-4 py-3"><Plus size={16}/></button>
                            </div>
                            <button onClick={handleAddToCart} className="w-full sm:w-auto flex-grow bg-blue-600 text-white font-bold py-3 px-8 rounded-lg cursor-pointer">ADD TO CART</button>
                            <button className="p-3 border rounded-lg hover:bg-gray-100"><Heart className="text-gray-600"/></button>
                        </div>
                        {addedToCart && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <CheckCircle size={20} />
                                <span>Successfully added to cart!</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 text-sm">
                        <p><span className="font-semibold text-gray-700">SKU:</span> {product.sku}</p>
                        <p className="mt-1"><span className="font-semibold text-gray-700">Category:</span> <Link href={`/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline"> {product.category}</Link></p>
                        <p className="mt-1"><span className="font-semibold text-gray-700">Tags:</span> {product.tags.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
