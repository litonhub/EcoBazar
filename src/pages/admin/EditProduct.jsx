import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import {
    getProductById,
    updateProduct,
} from "../../api/productApi";
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

            setThumbnailPreview(
                product.thumbnail?.url || ""
            );

            setGalleryPreview(
                product.images || []
            );
            setThumbnail(null);
            setImages([]);

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Failed to load product."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }

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
            formData.append(
                "thumbnail",
                thumbnail
            );
        }

        images.forEach((img) => {
            formData.append(
                "images",
                img
            );
        });

        try {
            setUpdating(true);

            const res = await updateProduct(
                id,
                formData
            );

            toast.success(
                res.data.message
            );

            navigate(
                "/admin-dashboard/products",
                {
                    replace: true,
                }
            );

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to update."
            );

        } finally {
            setUpdating(false);
        }
    };

    return (

        <>
            <Container>

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Edit Product
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* TITLE */}

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Product Title"
                            className="w-full border p-3 rounded"
                        />

                        {/* DESCRIPTION */}

                        <textarea
                            rows={5}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border p-3 rounded"
                        />

                        {/* PRICE + STOCK */}

                        <div className="grid grid-cols-2 gap-4">

                            <input
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border p-3 rounded"
                            />

                            <input
                                type="number"
                                name="stock"
                                min="0"
                                step="1"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Stock"
                                className="border p-3 rounded"
                            />

                        </div>

                        {/* CATEGORY + BRAND */}

                        <div className="grid grid-cols-2 gap-4">

                            <input
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="border p-3 rounded"
                            />

                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="Brand"
                                className="border p-3 rounded"
                            />

                        </div>

                        {/* CURRENT THUMBNAIL */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Thumbnail Preview
                            </label>

                            {thumbnailPreview && (
                                <img
                                    src={thumbnailPreview}
                                    alt="thumbnail"
                                    className="w-36 h-36 rounded-lg object-cover border"
                                />
                            )}

                        </div>

                        {/* NEW THUMBNAIL */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Replace Thumbnail
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setThumbnail(file);
                                    setThumbnailPreview(
                                        URL.createObjectURL(file)
                                    );
                                }}
                            />

                        </div>

                        {/* CURRENT GALLERY */}

                        <div>

                            <label className="block mb-3 font-medium">
                                Gallery Images
                            </label>

                            <div className="grid grid-cols-5 gap-3">

                                {galleryPreview.map((img) => (

                                    <img
                                        key={img.public_id}
                                        src={img.url}
                                        alt=""
                                        className="h-24 w-full object-cover rounded border"
                                    />

                                ))}

                            </div>

                        </div>

                        {/* NEW GALLERY */}
                        <div>

                            <label className="block mb-2 font-medium">
                                Replace Gallery
                            </label>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
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
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-primary text-white py-3 rounded-lg"
                        >
                            {updating
                                ? "Updating..."
                                : "Update Product"}
                        </button>

                    </form>

                </div>

            </Container>
        </>
    );
};

export default EditProduct;
