import React, { useState, useRef } from "react";
import { X, Upload, ImageIcon, Star, DollarSign, Tag, Type, Gamepad2, BookOpen, BookText } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthstore";

const typeOptions = [
    { value: "game", label: "Game", icon: <Gamepad2 size={18} />, color: "#00ff87" },
    { value: "manga", label: "Manga", icon: <BookOpen size={18} />, color: "#bf5af2" },
    { value: "story", label: "Story", icon: <BookText size={18} />, color: "#ff6b6b" },
];

const PublishModal = ({ isOpen, onClose, defaultType = "game", onPublished }) => {
    const { addProduct, isAdding } = useProductStore();
    const { authUser } = useAuthStore();

    const [form, setForm] = useState({
        title: "",
        type: defaultType,
        makerName: authUser?.name || "",
        isFree: true,
        price: 0,
        rating: 5,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (file) => {
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) handleImageChange(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            import("react-hot-toast").then(({ default: toast }) =>
                toast.error("Please select a cover image")
            );
            return;
        }
        if (!form.title.trim()) {
            import("react-hot-toast").then(({ default: toast }) =>
                toast.error("Please enter a title")
            );
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("type", form.type);
        formData.append("makerName", form.makerName || authUser?.name || "Unknown");
        formData.append("isFree", form.isFree);
        formData.append("price", form.isFree ? 0 : form.price);
        formData.append("rating", form.rating);
        formData.append("image", imageFile);

        const result = await addProduct(formData);
        if (result.success) {
            onPublished && onPublished(result.product);
            handleClose();
        }
    };

    const handleClose = () => {
        setForm({
            title: "",
            type: defaultType,
            makerName: authUser?.name || "",
            isFree: true,
            price: 0,
            rating: 5,
        });
        setImageFile(null);
        setImagePreview(null);
        onClose();
    };

    if (!isOpen) return null;

    const selectedType = typeOptions.find((t) => t.value === form.type);

    return (
        <div className="publish-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="publish-modal">
                {/* Header */}
                <div className="publish-modal-header">
                    <div className="publish-modal-title">
                        <div className="publish-modal-icon" style={{ color: selectedType?.color }}>
                            {selectedType?.icon}
                        </div>
                        <h2>Publish Your {selectedType?.label}</h2>
                    </div>
                    <button className="publish-modal-close" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="publish-modal-body">
                    {/* Type Selector */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <Tag size={14} /> Content Type
                        </label>
                        <div className="type-selector">
                            {typeOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`type-btn ${form.type === opt.value ? "active" : ""}`}
                                    style={form.type === opt.value ? { borderColor: opt.color, color: opt.color, background: `${opt.color}15` } : {}}
                                    onClick={() => setForm((f) => ({ ...f, type: opt.value }))}
                                >
                                    {opt.icon}
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <ImageIcon size={14} /> Cover Image
                        </label>
                        <div
                            className={`image-dropzone ${dragOver ? "drag-over" : ""} ${imagePreview ? "has-image" : ""}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <div className="image-preview-wrapper">
                                    <img src={imagePreview} alt="Preview" className="image-preview" />
                                    <div className="image-overlay">
                                        <Upload size={20} />
                                        <span>Change Image</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="dropzone-placeholder">
                                    <Upload size={32} className="upload-icon" />
                                    <p>Drop image here or <span>browse</span></p>
                                    <small>JPG, PNG, WEBP supported</small>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden-input"
                                onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <Type size={14} /> Title
                        </label>
                        <input
                            type="text"
                            className="publish-input"
                            placeholder={`Enter your ${form.type} title...`}
                            value={form.title}
                            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Maker Name */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <Tag size={14} /> Creator / Studio Name
                        </label>
                        <input
                            type="text"
                            className="publish-input"
                            placeholder="Your name or studio..."
                            value={form.makerName}
                            onChange={(e) => setForm((f) => ({ ...f, makerName: e.target.value }))}
                        />
                    </div>

                    {/* Pricing */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <DollarSign size={14} /> Pricing
                        </label>
                        <div className="pricing-toggle">
                            <button
                                type="button"
                                className={`price-btn ${form.isFree ? "active-free" : ""}`}
                                onClick={() => setForm((f) => ({ ...f, isFree: true, price: 0 }))}
                            >
                                🆓 Free
                            </button>
                            <button
                                type="button"
                                className={`price-btn ${!form.isFree ? "active-paid" : ""}`}
                                onClick={() => setForm((f) => ({ ...f, isFree: false }))}
                            >
                                💰 Paid
                            </button>
                        </div>
                        {!form.isFree && (
                            <div className="price-input-wrapper">
                                <span className="currency-symbol">₹</span>
                                <input
                                    type="number"
                                    className="publish-input price-input"
                                    placeholder="Enter price..."
                                    min={1}
                                    value={form.price}
                                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                                />
                            </div>
                        )}
                    </div>

                    {/* Stars Rating */}
                    <div className="publish-field">
                        <label className="publish-label">
                            <Star size={14} /> Initial Rating
                        </label>
                        <div className="stars-selector">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-btn ${star <= form.rating ? "star-active" : ""}`}
                                    onClick={() => setForm((f) => ({ ...f, rating: star }))}
                                >
                                    ★
                                </button>
                            ))}
                            <span className="rating-text">{form.rating}/5</span>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="publish-submit-btn"
                        disabled={isAdding}
                        style={{ background: `linear-gradient(135deg, ${selectedType?.color}cc, ${selectedType?.color}66)` }}
                    >
                        {isAdding ? (
                            <>
                                <div className="btn-spinner" /> Publishing...
                            </>
                        ) : (
                            <>
                                <Upload size={18} />
                                Publish {selectedType?.label}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublishModal;
