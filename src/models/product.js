import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    oldPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },
    vendor: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      unique: true, // প্রতিটি প্রোডাক্টের SKU আলাদা হতে হবে
      trim: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
      required: [true, "Image URL is required."],
    },
    imageAlt: {
      type: String,
    },
  },
  { timestamps: true } // createdAt এবং updatedAt ফিল্ড স্বয়ংক্রিয়ভাবে যোগ হবে
);

// যদি মডেলটি আগে তৈরি করা থাকে, তাহলে সেটি ব্যবহার করা হবে, নাহলে নতুন করে তৈরি করা হবে
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
