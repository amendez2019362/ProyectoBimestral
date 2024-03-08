import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "This parameter is required"],
    },
    price: {
        type: Number,
        required: [true, "This parameter is required"],
    },
    stock: {
        type: Number,
        required: [true, "This parameter is required"],
    },
    quantitySold: {
        type: Number,
        required: [true, "This parameter is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

productSchema.statics.findOutOfStockProducts = async function() {
    return this.find({ stock: 0 });
};

export default mongoose.model('Product', productSchema);