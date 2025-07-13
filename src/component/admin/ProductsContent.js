"use client";
import { useState, useEffect } from "react";
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Tag,
  Box,
  Library,
  Type,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  PlusCircle,
  List,
} from "lucide-react";
import Image from "next/image";

// --- Reusable Input Field Component for cleaner code ---
const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
  helperText,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
  </div>
);

// --- Sub-component for Viewing Products ---
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                  ৳{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Sub-component for Adding a New Product (Restored Full Form) ---
const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    vendor: "",
    sku: "",
    tags: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ message: "", type: "" });

    const dataToSubmit = {
      ...productData,
      price: parseFloat(productData.price),
      oldPrice: productData.oldPrice
        ? parseFloat(productData.oldPrice)
        : undefined,
      tags: productData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      setFormStatus({
        message: "Product added successfully!",
        type: "success",
      });
      setProductData({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "",
        vendor: "",
        sku: "",
        tags: "",
        imageUrl: "",
      });
    } catch (error) {
      setFormStatus({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <div className="space-y-4">
            <FormInput
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="e.g., High-Performance Gaming Mouse"
              required
              icon={<Type size={16} className="text-gray-400" />}
            />
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Write a detailed description..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Image</h3>
          <FormInput
            label="Image URL"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
            required
            icon={<UploadCloud size={16} className="text-gray-400" />}
          />
        </div>
      </div>

      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="space-y-4">
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              placeholder="2500"
              required
              icon={<DollarSign size={16} className="text-gray-400" />}
            />
            <FormInput
              label="Old Price"
              name="oldPrice"
              type="number"
              value={productData.oldPrice}
              onChange={handleChange}
              placeholder="2900 (Optional)"
              icon={<DollarSign size={16} className="text-gray-400" />}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Organization</h3>
          <div className="space-y-4">
            <FormInput
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="e.g., Gaming Gear"
              required
              icon={<Library size={16} className="text-gray-400" />}
            />
            <FormInput
              label="Vendor"
              name="vendor"
              value={productData.vendor}
              onChange={handleChange}
              placeholder="e.g., GamerGear"
              icon={<Box size={16} className="text-gray-400" />}
            />
            <FormInput
              label="SKU"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="Unique SKU"
              icon={<Tag size={16} className="text-gray-400" />}
            />
            <FormInput
              label="Tags"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
              placeholder="Gaming, Mouse, RGB"
              icon={<Tag size={16} className="text-gray-400" />}
              helperText="Use comma to separate tags."
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 font-bold text-lg"
        >
          {isLoading ? (
            "Adding Product..."
          ) : (
            <>
              <UploadCloud size={20} /> Add Product to Store
            </>
          )}
        </button>
        {formStatus.message && (
          <div
            className={`mt-4 flex items-center gap-3 p-4 rounded-lg text-sm ${
              formStatus.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {formStatus.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{formStatus.message}</span>
          </div>
        )}
      </div>
    </form>
  );
};

// --- Main ProductsContent Component with Tabs ---
export const ProductsContent = () => {
  const [activeSubTab, setActiveSubTab] = useState("view"); // 'view' or 'add'

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveSubTab("view")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
            activeSubTab === "view"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <List size={18} />
          View Products
        </button>
        <button
          onClick={() => setActiveSubTab("add")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
            activeSubTab === "add"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <PlusCircle size={18} />
          Add New Product
        </button>
      </div>

      {activeSubTab === "view" ? <ViewProducts /> : <AddProductForm />}
    </div>
  );
};
