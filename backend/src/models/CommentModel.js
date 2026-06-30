import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    username: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, { timestamps: true });

export default mongoose.models.comment ||
mongoose.model("comment", commentSchema);