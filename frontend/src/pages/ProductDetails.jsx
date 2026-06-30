import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthstore";
import { ArrowLeft, Lock, Unlock, Send, Gamepad2, BookOpen, BookText, MessageSquare, StarIcon } from "lucide-react";

const TYPE_META = {
    game: { label: "Game", icon: null, color: "#00ff87" },
    manga: { label: "Manga", icon: null, color: "#bf5af2" },
    story: { label: "Story", icon: null, color: "#ff6b6b" },
};

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
        " ⚡ " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
};

const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const avatarColors = ["#bf5af2", "#ff2d55", "#00ff87", "#0af", "#ff9f0a", "#30d158"];
const getAvatarColor = (name = "") => {
    let sum = 0;
    for (const c of name) sum += c.charCodeAt(0);
    return avatarColors[sum % avatarColors.length];
};


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const {
        currentProduct, comments, isLoading, isCommentsLoading, isAddingComment,
        fetchProductById, fetchComments, addComment, deleteComment
    } = useProductStore();

    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        fetchProductById(id);
        fetchComments(id);
    }, [id]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;
        const result = await addComment(id, reviewText.trim());
        if (result.success) setReviewText("");
    };

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < rating ? "#ffd700" : "#333", fontSize: "18px" }}><StarIcon /></span>
        ));

    const imageUrl = currentProduct?.image?.startsWith("http")
        ? currentProduct.image
        : `http://localhost:8000/${currentProduct?.image}`;

    const typeMeta = TYPE_META[currentProduct?.type] || TYPE_META.game;

    return (
        <div className="pd-page">
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back
            </button>

            {isLoading ? (
                <div className="pd-not-found">
                    <p>Product not found.</p>

                    <button
                        onClick={() => navigate(-1)}
                        className="pd-back-btn"
                    >
                        Go Back
                    </button>
                </div>
            ) : currentProduct ? (
                <>
                    <div className="pd-hero">
                        <div className="pd-image-wrap">
                            <img src={imageUrl} alt={currentProduct.title} className="pd-image"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/500x300?text=No+Image"; }} />
                            <div className="pd-image-overlay" />
                        </div>
                        <div className="pd-info">
                            <span className="pd-type-badge"
                                style={{ color: typeMeta.color, borderColor: typeMeta.color + "55", background: typeMeta.color + "18" }}>
                                {typeMeta.label}
                            </span>
                            <h1 className="pd-title">{currentProduct.title}</h1>
                            <p className="pd-maker">by <span>{currentProduct.makerName}</span></p>
                            <div className="pd-stars-row">
                                {renderStars(currentProduct.rating || 5)}
                                <span className="pd-rating-num">{currentProduct.rating || 5}.0</span>
                            </div>
                            <div className={`pd-price-tag ${currentProduct.isFree ? "pd-free" : "pd-paid"}`}>
                                {currentProduct.isFree ? <><Unlock size={14} /> Free to Access</> : <><Lock size={14} /> {currentProduct.price}</>}
                            </div>
                        </div>
                    </div>

                    <div className="pd-comments-section">
                        <h2 className="pd-comments-title">
                            <MessageSquare size={20} />
                            Community Reviews
                            <span className="pd-comments-count">{comments.length}</span>
                        </h2>

                        <form className="pd-review-form" onSubmit={handleSubmitComment}>
                            <div className="pd-review-avatar" style={{ background: getAvatarColor(authUser?.name) }}>
                                {getInitials(authUser?.name)}
                            </div>
                            <div className="pd-review-input-wrap">
                                <textarea className="pd-review-textarea"
                                    placeholder="Share your thoughts about this product..."
                                    value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                                    rows={3} maxLength={500} />
                                <div className="pd-review-footer">
                                    <span className="pd-char-count">{reviewText.length}/500</span>
                                    <button type="submit" className="pd-review-submit"
                                        disabled={isAddingComment || !reviewText.trim()}>
                                        {isAddingComment ? <div className="pd-btn-spinner" /> : <><Send size={14} /> Post Review</>}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {isCommentsLoading ? (
                            <div className="pd-comments-loading">
                                {[...Array(3)].map((_, i) => <div key={i} className="pd-comment-skeleton" />)}
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="pd-no-comments">
                                <MessageSquare size={40} strokeWidth={1} />
                                <p>No reviews yet. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            <div className="pd-comments-list">
                                {comments.map((c) => (
                                    <div key={c._id} className="pd-comment-card">
                                        <div className="pd-comment-avatar" style={{ background: getAvatarColor(c.username) }}>
                                            {getInitials(c.username)}
                                        </div>
                                        <div className="pd-comment-body">
                                            <div className="pd-comment-header">
                                                <span className="pd-comment-username">{c.username}</span>
                                                <span className="pd-comment-date">{formatDate(c.createdAt)}</span>


                                            </div>
                                            <p className="pd-comment-text">{c.comment}</p>
                                        </div>
                                        {
                                            authUser?._id === c.userId && (

                                                <button
                                                    className="pd-delete-btn bg-white text-black rounded px-5"
                                                    onClick={() => deleteComment(c._id)}
                                                >
                                                    Delete
                                                </button>

                                            )
                                        }
                                    </div>
                                ))}

                            </div>

                        )}
                    </div>
                </>
            ) : (
                <div className="pd-not-found">
                    <p>Product not found.</p>
                    <button onClick={() => navigate(-1)} className="pd-back-btn">? Go Back</button>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
