"use client";

import { useState, useEffect } from 'react';
import ProductFilter from "@/component/ProductFilter"; 
import ProductGrid from "@/component/productGrid";  

export default function AllProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/products');
                const data = await response.json();
                setAllProducts(data);
                setAvailableCategories([...new Set(data.map(p => p.category))]);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter logic
    useEffect(() => {
        let products = allProducts;
        if (products.length === 0) return;

        if (selectedCategories.length > 0) {
            products = products.filter(p => selectedCategories.includes(p.category));
        }

        products = products.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
        setFilteredProducts(products);
    }, [selectedCategories, priceRange, allProducts]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center">Loading Products...</div>;
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">All Products</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <ProductFilter
                            categories={availableCategories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                            priceRange={priceRange}
                            onPriceChange={handlePriceChange}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
