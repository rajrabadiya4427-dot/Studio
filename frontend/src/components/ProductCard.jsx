import React, { useState } from "react";
import { Trash2, Star, Lock, Unlock } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthstore";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { deleteProduct, isDeleting } = useProductStore();
    const { authUser } = useAuthStore();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const isOwner = authUser?._id?.toString() === product.userId?.toString();

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }
        setDeleting(true);
        await deleteProduct(product._id);
        setDeleting(false);
    };

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`product-star ${i < rating ? "star-filled" : "star-empty"}`}>
                ★
            </span>
        ));
    };

    const imageUrl = product.image?.startsWith("http")
        ? product.image
        : `http://localhost:8000/${product.image}`;

    return (
        <div className="product-card" onClick={handleCardClick}>
            {/* Image */}
            <div className="product-card-img-wrapper">
                <img
                    src={imageUrl}
                    alt={product.title}
                    className="product-card-img"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                />
                {/* Price Badge */}
                <div className={`product-badge ${product.isFree ? "badge-free" : "badge-paid"}`}>
                    {product.isFree ? (
                        <><Unlock size={11} /> FREE</>
                    ) : (
                        <><Lock size={11} /> ₹{product.price}</>
                    )}
                </div>

                {/* Delete button - only for owner */}
                {isOwner && (
                    <button
                        className={`product-delete-btn ${confirmDelete ? "confirm-mode" : ""}`}
                        onClick={handleDelete}
                        disabled={deleting}
                        title={confirmDelete ? "Click again to confirm delete" : "Delete product"}
                    >
                        {deleting ? (
                            <div className="delete-spinner" />
                        ) : (
                            <Trash2 size={15} />
                        )}
                        {confirmDelete && <span className="confirm-text">Confirm?</span>}
                    </button>
                )}
            </div>

            {/* Info */}
            <div className="product-card-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-maker">by {product.makerName}</p>

                <div className="product-card-footer">
                    <div className="product-stars">
                        {renderStars(product.rating || 5)}
                        <span className="rating-num">{product.rating || 5}.0</span>
                    </div>
                    <div className={`product-price ${product.isFree ? "price-free" : "price-paid"}`}>
                        {product.isFree ? "Free" : `₹${product.price}`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

