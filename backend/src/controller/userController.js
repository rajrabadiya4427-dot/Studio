import UserModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import ProductModel from "../models/ProductModel.js";

const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// REGISTER
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password too short"
            });
        }

        const userExists =
            await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// LOGIN
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        const user =
            await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token =
            createToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteAccount = async (req, res) => {
    try {

        const userId = req.userId;

        await ProductModel.deleteMany({
            userId
        });

        await UserModel.findByIdAndDelete(
            userId
        );

        res.json({
            success: true,
            message: "Account Deleted"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }
};

// LOGOUT
export const logoutUser = async (req, res) => {
    res.json({
        success: true,
        message: "Logged Out"
    });
};

// UPDATE PROFILE PICTURE
export const updateProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No profile picture file provided"
            });
        }

        const imageUrl = req.file.path; // Multer uploads to Cloudinary and populates path

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.userId,
            { profilePic: imageUrl },
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            message: "Profile picture updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};