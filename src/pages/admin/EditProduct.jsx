import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Loader2, UploadCloud, Image as ImageIcon, Edit2 } from "lucide-react";

import { getProductById, updateProduct } from "../../api/productApi";
import Container from "../../components/layouts/Container";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [galleryPreview, setGalleryPreview] = useState([]);

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getProductById(id);
            const product = res.data.data;

            setForm({
                title: product.title || "",
                description: product.description || "",
                price: product.price ?? "",
                category: product.category || "",
                brand: product.brand || "",
                stock: product.stock ?? "",
            });

            setThumbnailPreview(product.thumbnail?.url || "");
            setGalleryPreview(product.images || []);
            setThumbnail(null);
            setImages([]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to load product.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        images.forEach((img) => {
            formData.append("images", img);
        });

        try {
            setUpdating(true);

            const res = await updateProduct(id, formData);
            toast.success(res.data.message);

            navigate("/admin-dashboard/products", {
                replace: true,
            });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-primary">
                    <Loader2 className="mb-4 h-10 w-10 animate-spin" />
                    <p className="font-medium text-gray-500">Loading Product Details...</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="mx-auto max-w-4xl rounded-2xl border border-brdr bg-white p-6 font-pop shadow-sm md:p-8">
                
                <div className="mb-8 border-b border-brdr pb-5">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Update your product information, pricing, and images below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* TITLE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            className="w-full rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            rows={5}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write a detailed description..."
                            className="w-full resize-none rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* PRICE + STOCK */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                min="0"
                                step="1"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* CATEGORY + BRAND */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="e.g., Clothing"
                                className="w-full rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Brand
                            </label>
                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="e.g., Zara"
                                className="w-full rounded-xl border border-brdr px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* IMAGE UPLOADS (Premium Layout) */}
                    <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
                        
                        {/* THUMBNAIL */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Product Thumbnail
                            </label>
                            <label className="group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-brdr bg-gray-50/50 transition-all hover:border-primary hover:bg-primary/5">
                                {thumbnailPreview ? (
                                    <>
                                        <img
                                            src={thumbnailPreview}
                                            alt="thumbnail"
                                            className="h-full w-full object-contain p-2"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md">
                                                <Edit2 size={16} /> Change Image
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-primary">
                                        <ImageIcon className="mb-2 h-10 w-10 opacity-75" />
                                        <span className="text-sm font-semibold">Upload Thumbnail</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        setThumbnail(file);
                                        setThumbnailPreview(URL.createObjectURL(file));
                                    }}
                                />
                            </label>
                        </div>

                        {/* GALLERY */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Replace Gallery Images
                            </label>
                            <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brdr bg-primary/5 transition-all hover:border-primary hover:bg-primary/10">
                                <div className="flex flex-col items-center justify-center text-center text-primary">
                                    <UploadCloud className="mb-3 h-10 w-10 opacity-75" />
                                    <p className="text-sm font-semibold">Upload New Gallery</p>
                                    <p className="mt-1 px-4 text-xs text-gray-500">
                                        Selecting new images will replace the existing gallery (Max 10).
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        if (files.length > 10) {
                                            toast.error("Maximum 10 images allowed");
                                            return;
                                        }
                                        setImages(files);
                                        setGalleryPreview(
                                            files.map((file) => ({
                                                url: URL.createObjectURL(file),
                                                public_id: file.name,
                                            }))
                                        );
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* GALLERY PREVIEW GRID */}
                    {galleryPreview.length > 0 && (
                        <div className="rounded-xl border border-brdr bg-gray-50 p-5 shadow-sm">
                            <h4 className="mb-3 text-sm font-semibold text-gray-700">
                                Gallery Preview ({galleryPreview.length})
                            </h4>
                            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                                {galleryPreview.map((img, index) => (
                                    <div key={img.public_id || index} className="aspect-square rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                                        <img
                                            src={img.url}
                                            alt="gallery"
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {updating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Updating Product...
                                </span>
                            ) : (
                                "Update Product"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </Container>
    );
};

export default EditProduct;