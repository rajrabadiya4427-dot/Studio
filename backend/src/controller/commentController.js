import CommentModel from "../models/CommentModel.js";
import UserModel from "../models/userModels.js";

export const addComment = async (req, res) => {

    try {

        const { productId, comment } = req.body;

        const user =
            await UserModel.findById(
                req.userId
            );

        const newComment =
            await CommentModel.create({

                productId,

                userId: req.userId,

                username: user.name,

                comment

            });

        res.json({
            success: true,
            comment: newComment
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const getComments = async (req, res) => {

    try {

        const comments =
            await CommentModel.find({

                productId:
                    req.params.productId

            }).sort({
                createdAt: -1
            });

        res.json({
            success: true,
            comments
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const deleteComment = async (req, res) => {
    try {

        const { commentId } = req.params;

        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // sirf owner delete kare

        if (comment.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await CommentModel.findByIdAndDelete(commentId);

        res.json({
            success: true,
            message: "Comment deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};