import ProductModel from "../models/ProductModel.js";

export const addProduct = async (req, res) => {

    try {

        const {
            title,
            type,
            makerName,
            rating,
            isFree,
            price
        } = req.body;

        const product = await ProductModel.create({

            title,
            type,
            makerName,
            rating,
            isFree,
            price,

            image: req.file.path,

            userId: req.userId

        });

        res.json({
            success: true,
            product
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const getProducts = async (req, res) => {

    try {

        const products =
            await ProductModel.find();

        res.json({
            success: true,
            products
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const getMyProducts = async (req, res) => {

    try {

        const products =
            await ProductModel.find({
                userId: req.userId
            });

        res.json({
            success: true,
            products
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const deleteProduct = async (req, res) => {

    try {

        const product =
            await ProductModel.findById(
                req.params.id
            );

        if (!product) {

            return res.json({
                success: false,
                message: "Product Not Found"
            });

        }

        if (
            product.userId.toString()
            !==
            req.userId
        ) {

            return res.json({
                success: false,
                message: "You Can Delete Only Your Products"
            });

        }

        await ProductModel.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Deleted Successfully"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};

export const getProductById = async (req, res) => {

    try {

        const product =
            await ProductModel.findById(
                req.params.id
            );

        if (!product) {
            return res.json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

};