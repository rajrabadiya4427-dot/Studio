import { Menu, Plus, BookOpen } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import gsap from "gsap";
import { useProductStore } from '../../store/useProductStore';
import ProductCard from '../ProductCard';
import PublishModal from '../PublishModal';

const AllManga = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef(null);
    const { products, fetchProducts, isLoading } = useProductStore();

    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All", "Shonen", "Shojo", "Seinen", "Josei",
        "Isekai", "Fantasy", "Romance", "Action",
        "Comedy", "Slice of Life", "Horror", "Mystery"
    ];

    useEffect(() => {
        fetchProducts("manga");
    }, []);

    const handlePublished = () => {
        fetchProducts("manga");
    };

    const toggleMenu = () => {
        if (!isMenuOpen) {
            gsap.to(menuRef.current, {
                x: 0, y: 10, opacity: 1, duration: 0.5,
                ease: "power3.out", pointerEvents: "auto",
            });
        } else {
            gsap.to(menuRef.current, {
                x: -30, opacity: 0, duration: 0.4,
                ease: "power3.in", pointerEvents: "none",
            });
        }
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='relative min-h-screen w-full bg-black flex items-top justify-center'>
            <div className='relative flex h-full w-full items-top justify-center'>
                <div className="relative right h-full w-full flex flex-col items-center justify-between bg-black">

                    {/* Header */}
                    <div className="w-full flex items-center justify-between px-5 border-b border-gray-500 py-4">
                        <button onClick={toggleMenu} className='text-white'>
                            <Menu size={28} />
                        </button>

                        <h1 className='font-bold text-lg text-white'>PUBLISHED MANGA</h1>

                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-sm tracking-wide hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-purple-900/40"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} />
                            <span>Publish Manga</span>
                        </button>
                    </div>

                    {/* Manga Grid */}
                    {isLoading ? (
                        <div className="products-loading">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="product-skeleton" />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="products-empty">
                            <BookOpen size={64} className="empty-icon" />
                            <h3>No Manga Published Yet</h3>
                            <p>Be the first to publish a manga!</p>
                            <button
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-sm tracking-wide hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-purple-900/40"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Plus size={18} /> Publish First Manga
                            </button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Category Menu */}
                    <div
                        ref={menuRef}
                        style={{ transform: "translateX(-200%)" }}
                        className="category-menu"
                    >
                        <div className="left">
                            {categories.slice(0, Math.ceil(categories.length / 2)).map((cat) => (
                                <li
                                    key={cat}
                                    onClick={toggleMenu}
                                    className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </div>
                        <div className="right">
                            {categories.slice(Math.ceil(categories.length / 2)).map((cat) => (
                                <li
                                    key={cat}
                                    onClick={toggleMenu}
                                    className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Publish Modal */}
            <PublishModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                defaultType="manga"
                onPublished={handlePublished}
            />
        </div>
    );
};

export default AllManga;