import { useState } from "react";
import { toast } from "react-toastify";
import { UploadCloud, Image as ImageIcon } from "lucide-react"; // প্রিমিয়াম লুকের জন্য আইকন যুক্ত করা হয়েছে
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
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-brdr font-pop">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below to add a new product to your catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TITLE */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Product Title <span className="text-red-500">*</span></label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Premium Leather Jacket"
            required
            className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={form.description}
            required
            onChange={handleChange}
            placeholder="Write a detailed description about the product..."
            rows="4"
            className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Price <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              required
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Stock Quantity <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="0"
              step="1"
              name="stock"
              value={form.stock}
              required
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* CATEGORY + BRAND */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
            <input
              name="category"
              value={form.category}
              required
              onChange={handleChange}
              placeholder="e.g., Clothing"
              className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g., Zara"
              className="w-full rounded-xl border border-brdr bg-white p-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* FILE UPLOADS (Premium Look) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* THUMBNAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Thumbnail <span className="text-red-500">*</span></label>
            <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-brdr bg-gray-50/50 cursor-pointer transition-all hover:bg-gray-100 hover:border-primary">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {thumbnail ? (
                  <div className="flex flex-col items-center text-primary">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{thumbnail.name}</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-primary">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP (1 file)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                required
                className="hidden"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </label>
          </div>

          {/* IMAGES */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Gallery Images</label>
            <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-brdr bg-gray-50/50 cursor-pointer transition-all hover:bg-gray-100 hover:border-primary">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {images.length > 0 ? (
                  <div className="flex flex-col items-center text-primary">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{images.length} file(s) selected</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-primary">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP (Max 10)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  if (files.length > 10) {
                    toast.error("Maximum 10 images allowed");
                    return;
                  }

                  setImages(files);
                }}
              />
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3.5 text-base font-semibold text-white transition-all duration-300 cursor-pointer
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary shadow-md hover:shadow-lg hover:opacity-90 active:scale-[0.99]"
              }`}
          >
            {loading ? "Creating Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;