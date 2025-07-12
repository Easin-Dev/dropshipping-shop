import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // আপনার প্রোডাক্ট মডেলের রেফারেন্স
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});


const orderSchema = new Schema(
    {
        contactInfo: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String },
        },
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            area: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['cod', 'online'], // শুধুমাত্র এই দুটি ভ্যালু গ্রহণ করবে
        },
        items: [OrderItemSchema], // এখানে আমরা উপরের সাব-স্কিমা ব্যবহার করছি
        totalPrice: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['newOrder', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'newOrder', // ডিফল্ট স্ট্যাটাস
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
        // ভবিষ্যতে ব্যবহারকারীর আইডি যোগ করার জন্য
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // },
    },
    { timestamps: true } // createdAt এবং updatedAt ফিল্ড স্বয়ংক্রিয়ভাবে যোগ হবে
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
