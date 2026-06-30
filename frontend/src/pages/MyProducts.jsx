import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import { PackageOpen, ArrowLeft, Gamepad2, BookOpen, BookText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
    const { products, fetchMyProducts, isLoading } = useProductStore();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all"); // 'all', 'game', 'manga', 'story'

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const filteredProducts = filter === "all"
        ? products
        : products.filter((p) => p.type === filter);

    const counts = {
        all: products.length,
        game: products.filter((p) => p.type === "game").length,
        manga: products.filter((p) => p.type === "manga").length,
        story: products.filter((p) => p.type === "story").length,
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-10">
            {/* Back button and title */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/profile")}
                        className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                        title="Back to profile"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                            My Published Products
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">Manage and track your published creations</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 bg-zinc-900/60 p-1.5 border border-zinc-800 rounded-2xl">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${filter === "all" ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
                    >
                        All ({counts.all})
                    </button>
                    <button
                        onClick={() => setFilter("game")}
                        className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all ${filter === "game" ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
                    >
                        <Gamepad2 size={14} /> Games ({counts.game})
                    </button>
                    <button
                        onClick={() => setFilter("manga")}
                        className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all ${filter === "manga" ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
                    >
                        <BookOpen size={14} /> Manga ({counts.manga})
                    </button>
                    <button
                        onClick={() => setFilter("story")}
                        className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all ${filter === "story" ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
                    >
                        <BookText size={14} /> Stories ({counts.story})
                    </button>
                </div>
            </div>

            {/* Grid display */}
            <div className="max-w-6xl mx-auto">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="product-skeleton" />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="min-h-[50vh] bg-zinc-950/40 border border-zinc-900 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                        <PackageOpen size={64} className="text-zinc-600 mb-4" />
                        <h3 className="text-xl font-bold text-zinc-400">No items found</h3>
                        <p className="text-sm text-zinc-600 mt-1 max-w-sm">
                            {filter === "all"
                                ? "You haven't published any items yet. Navigate to Games, Manga or Story page to publish your work!"
                                : `You haven't published any products in the "${filter}" category yet.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
