import React, { useState, useEffect } from 'react';
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaFacebookF, FaTwitter, FaPinterestP, FaInstagram,
  FaChevronUp, FaChevronDown, FaTimes
} from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext"; // <-- Currency Context Import

const ProductQuickView = ({ isOpen, onClose, product }) => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency(); // <-- formatPrice Hook
  const queryClient = useQueryClient();

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success("Product added to cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        "Failed to add product"
      );
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      productId: product._id,
      quantity,
    });
  };

  // Wishlist Mutation (New Logic)
  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.success("Product added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to add product to wishlist"
      );
    },
  });

  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate({ productId: product._id });
  };

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail?.url || product.images?.[0]?.url || "https://via.placeholder.com/400");
      setQuantity(1);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleQuantity = (type) => {
    if (type === 'inc' && quantity < (product?.stock || 100)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FF8A00] text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FF8A00] text-sm" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-[#FF8A00] text-sm" />);
    }
    return stars;
  };

  const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean);

  // --- Dynamic Translated Object Extraction ---
  const prodTitle = typeof product.title === 'object' ? (product.title[i18n.language] || product.title.en) : product.title;
  const prodDesc = typeof product.description === 'object' ? (product.description[i18n.language] || product.description.en) : product.description;
  const currentTags = typeof product.tags === 'object' && !Array.isArray(product.tags)
    ? (product.tags[i18n.language] || product.tags.en || [])
    : (product.tags || []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[1050px]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10 cursor-pointer"
        >
          <FaTimes size={26} />
        </button>

        <div
          className="bg-white w-full rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row gap-10 max-h-[90vh] overflow-y-auto hide-scrollbar cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-4 lg:w-1/2 h-[400px]">
            <div className="flex flex-col items-center gap-3 w-20 flex-shrink-0">
              <button className="text-gray-400 hover:text-[#00B207] transition cursor-pointer">
                <FaChevronUp />
              </button>
              <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar flex-1 py-1">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img.url)}
                    className={`w-20 h-20 rounded-md border-2 cursor-pointer p-1 transition-all ${mainImage === img.url ? 'border-[#00B207]' : 'border-gray-200 hover:border-[#00B207]'}`}
                  >
                    <img src={img.url} alt="thumbnail" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              <button className="text-gray-400 hover:text-[#00B207] transition cursor-pointer">
                <FaChevronDown />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 bg-white">
              <img src={mainImage} alt={prodTitle} className="max-w-full max-h-full object-contain" />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:w-1/2 font-pop text-[#1a1a1a]">

            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-semibold">{prodTitle}</h2>
              {product.stock > 0 ? (
                <span className="bg-[#e6f7e6] text-[#00B207] text-xs font-medium px-2.5 py-1 rounded">{t('details.in_stock', 'In Stock')}</span>
              ) : (
                <span className="bg-[#f5e1e1] text-[#ea4b48] text-xs font-medium px-2.5 py-1 rounded">{t('details.out_of_stock', 'Out of Stock')}</span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating || product.averageRating)}
                <span className="ml-1 text-[#1a1a1a]">{product.totalRatings || 0} {t('details.review', 'Review')}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div><span className="font-medium text-[#1a1a1a]">SKU:</span> {product.sku || "2,51,594"}</div>
            </div>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              {product.discountPercentage > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
              {/* --- Updated Pricing with formatPrice --- */}
              <span className="text-2xl font-semibold text-[#00B207]">
                {formatPrice(product.price)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="bg-[#f5e1e1] text-[#ea4b48] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {product.discountPercentage}% {t('details.off', 'Off')}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{t('details.brand', 'Brand')}:</span>
                <div className="px-3 h-8 border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[#00B207] font-semibold text-xs capitalize">{product.brand || t('details.local', 'Local')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{t('details.share', 'Share item')}:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaFacebookF size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaTwitter size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaPinterestP size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaInstagram size={14} /></button>
                </div>
              </div>
            </div>

            <p className="text-[#666666] text-sm leading-relaxed mb-6 line-clamp-3">
              {prodDesc || "No description available for this product."}
            </p>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-full h-12 w-32 px-4 justify-between">
                <button onClick={() => handleQuantity('dec')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50 cursor-pointer"><FiMinus /></button>
                <span className="font-medium">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50 cursor-pointer"><FiPlus /></button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={
                  product.stock < 1 ||
                  addToCartMutation.isPending
                }
                className="flex-1 h-12 bg-[#00B207] text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#009206] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {addToCartMutation.isPending
                  ? t('hot_deals.adding', "Adding...")
                  : t('details.add_to_cart', "Add to Cart")}

                <HiOutlineShoppingBag size={20} />
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={addToWishlistMutation.isPending}
                className="h-12 w-12 bg-[#e6f7e6] text-[#00B207] rounded-full flex items-center justify-center hover:bg-[#00B207] hover:text-white transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                <AiOutlineHeart size={22} />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium text-[#1a1a1a]">{t('details.category', 'Category')}:</span> <span className="text-gray-500 capitalize">{product.category}</span></p>
              {currentTags.length > 0 && (
                <p className="text-sm"><span className="font-medium text-[#1a1a1a]">{t('details.tag', 'Tag')}:</span> <span className="text-gray-500 capitalize">{currentTags.join(", ")}</span></p>
              )}
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default ProductQuickView;