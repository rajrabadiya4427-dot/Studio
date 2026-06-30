import { create } from "zustand";
import { axiosInstance } from "../config/config";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
    products: [],
    isLoading: false,
    isAdding: false,
    isDeleting: false,

    // Detail page state
    currentProduct: null,
    comments: [],
    isCommentsLoading: false,
    isAddingComment: false,

    // Fetch all products (optionally filtered by type)
    fetchProducts: async (type = null) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/product/list");
            if (res.data.success) {
                const all = res.data.products;
                const filtered = type
                    ? all.filter((p) => p.type === type)
                    : all;
                set({ products: filtered });
            } else {
                toast.error(res.data.message || "Failed to fetch products");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products");
        } finally {
            set({ isLoading: false });
        }
    },

    // Fetch logged-in user's products
    fetchMyProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/product/my-products");
            if (res.data.success) {
                set({ products: res.data.products });
            } else {
                toast.error(res.data.message || "Failed to fetch your products");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch your products");
        } finally {
            set({ isLoading: false });
        }
    },

    // Fetch single product by ID
    fetchProductById: async (productId) => {
        set({ isLoading: true, currentProduct: null });
        try {
            const res = await axiosInstance.get(`/product/${productId}`);
            if (res.data.success) {
                set({ currentProduct: res.data.product });
            } else {
                toast.error(res.data.message || "Product not found");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch product");
        } finally {
            set({ isLoading: false });
        }
    },

    // Fetch comments for a product
    fetchComments: async (productId) => {
        set({ isCommentsLoading: true });
        try {
            const res = await axiosInstance.get(`/comment/${productId}`);
            if (res.data.success) {
                set({ comments: res.data.comments });
            } else {
                toast.error(res.data.message || "Failed to fetch comments");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch comments");
        } finally {
            set({ isCommentsLoading: false });
        }
    },

    // Add a comment to a product
    addComment: async (productId, comment) => {
        set({ isAddingComment: true });
        try {
            const res = await axiosInstance.post("/comment/add", { productId, comment });
            if (res.data.success) {
                // Prepend the new comment to the list
                set((state) => ({
                    comments: [res.data.comment, ...state.comments],
                }));
                return { success: true };
            } else {
                toast.error(res.data.message || "Failed to add comment");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add comment");
            return { success: false };
        } finally {
            set({ isAddingComment: false });
        }
    },

    // Add new product
    addProduct: async (formData) => {
        set({ isAdding: true });
        try {
            const res = await axiosInstance.post("/product/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                toast.success("Product published successfully! 🎉");
                return { success: true, product: res.data.product };
            } else {
                toast.error(res.data.message || "Failed to publish product");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to publish product");
            return { success: false };
        } finally {
            set({ isAdding: false });
        }
    },

    // Delete product
    deleteProduct: async (productId) => {
        set({ isDeleting: true });
        try {
            const res = await axiosInstance.delete(`/product/delete/${productId}`);
            if (res.data.success) {
                toast.success("Product deleted successfully");
                set((state) => ({
                    products: state.products.filter((p) => p._id !== productId),
                }));
                return { success: true };
            } else {
                toast.error(res.data.message || "Failed to delete product");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete product");
            return { success: false };
        } finally {
            set({ isDeleting: false });
        }
    },

    deleteComment: async (commentId) => {

        try {

            await axiosInstance.delete(`/comment/delete/${commentId}`);

            set((state) => ({
                comments: state.comments.filter(
                    c => c._id !== commentId
                )
            }));

            toast.success("Comment deleted");

        } catch (error) {

            toast.error(error.response.data.message);

        }

    },
}));


