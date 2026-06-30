import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["game", "manga", "story"],
        required: true
    },

    image: {
        type: String,
        required: true
    },

    makerName: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 5
    },

    isFree: {
        type: Boolean,
        default: true
    },

    price: {
        type: Number,
        default: 0
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, { timestamps: true });

const ProductModel =
    mongoose.models.product ||
    mongoose.model("product", productSchema);

export default ProductModel;