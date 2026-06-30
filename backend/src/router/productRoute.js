import express from "express";

import authUser from "../middleware/auth.js";

import upload from "../middleware/multer.js";

import {
    addProduct,
    getProducts,
    getMyProducts,
    deleteProduct,
    getProductById
}
    from "../controller/productController.js";

const productRouter =
    express.Router();

productRouter.post(
    "/add",
    authUser,
    upload.single("image"),
    addProduct
);

productRouter.get(
    "/list",
    getProducts
);

productRouter.get(
    "/my-products",
    authUser,
    getMyProducts
);

productRouter.delete(
    "/delete/:id",
    authUser,
    deleteProduct
);

productRouter.get(
    "/:id",
    getProductById
);

export default productRouter;