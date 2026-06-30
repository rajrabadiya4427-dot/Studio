import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { useNavigate } from "react-router-dom";
import { Camera, Mail, User, ShieldAlert, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
    const { authUser, updateProfile } = useAuthStore();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", file);

        setIsUpdating(true);
        const res = await updateProfile(formData);
        setIsUpdating(false);
    };

    if (!authUser) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p className="text-xl font-bold">Please log in to view your profile</p>
            </div>
        );
    }

    const imageUrl = authUser.profilePic
        ? (authUser.profilePic.startsWith("http") ? authUser.profilePic : `http://localhost:8000/${authUser.profilePic}`)
        : null;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                {/* Glow effects */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">Manage your developer account info</p>

                    {/* Avatar Upload Section */}
                    <div className="relative mt-8 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-800 relative transition-transform group-hover:scale-105 duration-300">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={authUser.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=" + authUser.name;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-emerald-500 text-black flex items-center justify-center font-bold text-4xl">
                                    {authUser.name ? authUser.name[0].toUpperCase() : "U"}
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="text-white w-6 h-6" />
                            </div>
                        </div>

                        {/* Camera badge */}
                        <div className="absolute bottom-1 right-1 bg-emerald-500 p-2 rounded-full text-black hover:scale-110 transition-transform shadow-lg z-10">
                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUpdating}
                        />
                    </div>

                    <p className="text-xs text-zinc-500 mt-3">Click on image or camera icon to upload profile picture</p>

                    {/* Profile Fields */}
                    <div className="w-full mt-8 space-y-4">
                        {/* Name field */}
                        <div className="flex flex-col text-left">
                            <span className="text-xs text-zinc-500 font-semibold mb-1 flex items-center gap-1">
                                <User size={13} /> Full Name
                            </span>
                            <div className="bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-xl text-zinc-200 text-sm font-medium">
                                {authUser.name}
                            </div>
                        </div>

                        {/* Email field */}
                        <div className="flex flex-col text-left">
                            <span className="text-xs text-zinc-500 font-semibold mb-1 flex items-center gap-1">
                                <Mail size={13} /> Email Address
                            </span>
                            <div className="bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-xl text-zinc-200 text-sm font-medium">
                                {authUser.email}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Button */}
                    <button
                        onClick={() => navigate("/my-products")}
                        className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                    >
                        <span>My Published Products</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
