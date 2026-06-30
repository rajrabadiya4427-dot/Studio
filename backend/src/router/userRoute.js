import express from "express";
import { registerUser, loginUser, logoutUser, deleteAccount, checkAuth, updateProfile } from "../controller/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.delete("/delete-account", authUser, deleteAccount);
userRouter.get("/checkAuth", authUser, checkAuth);
userRouter.put("/update-profile", authUser, upload.single("profilePic"), updateProfile);

export default userRouter;