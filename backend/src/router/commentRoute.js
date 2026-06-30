import express from "express";

import authUser
from "../middleware/auth.js";

import {
    addComment,
    getComments,
    deleteComment
}
from "../controller/commentController.js";

const commentRouter =
    express.Router();

commentRouter.post(
    "/add",
    authUser,
    addComment
);
commentRouter.delete(
    "/delete/:commentId",
    authUser,
    deleteComment
);

commentRouter.get(
    "/:productId",
    getComments
);

export default commentRouter;