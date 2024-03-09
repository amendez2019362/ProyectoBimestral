import mongoose from "mongoose";

const facturaItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const facturaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart',
        required: true
    },
    items: [facturaItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Factura', facturaSchema);