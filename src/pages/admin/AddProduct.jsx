import { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../../api/productApi";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);

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

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      return toast.error("Thumbnail required");
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("thumbnail", thumbnail);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      setLoading(true);

      const res = await createProduct(formData);

      toast.success(res.data.message);

      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
      });

      setThumbnail(null);
      setImages([]);

      // file input reset করার জন্য
      e.target.reset();

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          required
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={form.price}
            required
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          <input
            type="number"
            min="0"
            name="stock"
            value={form.stock}
            required
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />
        </div>

        {/* CATEGORY + BRAND */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="category"
            value={form.category}
            required
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />

          <input
            name="brand"
            value={form.brand}
            required
            onChange={handleChange}
            placeholder="Brand"
            className="border p-2 rounded"
          />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="block mb-1">Thumbnail</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp/i"
            required
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="block mb-1">Gallery Images</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp/i"
            multiple
            onChange={(e) =>
              setImages(Array.from(e.target.files))
            }
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded py-2 text-white transition
${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:opacity-90"
            }`}
        >
          {loading ? "Creating..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;