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
import { useCurrency } from "../context/CurrencyContext"; 

const ProductQuickView = ({ isOpen, onClose, product }) => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency(); 
  const queryClient = useQueryClient();

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

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
      stars.push(<FaStar key={`full-${i}`} className="text-[#FF8A00] text-[12px] lg:text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FF8A00] text-[12px] lg:text-sm" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-[#FF8A00] text-[12px] lg:text-sm" />);
    }
    return stars;
  };

  const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean);

  const prodTitle = typeof product.title === 'object' ? (product.title[i18n.language] || product.title.en) : product.title;
  const prodDesc = typeof product.description === 'object' ? (product.description[i18n.language] || product.description.en) : product.description;
  const currentTags = typeof product.tags === 'object' && !Array.isArray(product.tags)
    ? (product.tags[i18n.language] || product.tags.en || [])
    : (product.tags || []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[1050px]">
        
        {/* Close Button: Absolute inside modal on mobile, outside on desktop */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 lg:-top-10 lg:right-0 w-8 h-8 lg:w-auto lg:h-auto bg-gray-100 lg:bg-transparent rounded-full flex items-center justify-center text-gray-600 lg:text-white hover:text-gray-900 lg:hover:text-gray-300 transition-colors z-[110] cursor-pointer"
        >
          <FaTimes className="text-[14px] lg:text-[26px]" />
        </button>

        {/* Modal Body */}
        <div
          className="bg-white w-full rounded-xl p-5 sm:p-6 lg:p-10 flex flex-col lg:flex-row gap-5 lg:gap-10 max-h-[90vh] overflow-y-auto hide-scrollbar cursor-default relative"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Images Section */}
          <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4 lg:w-1/2 h-auto lg:h-[400px]">
            <div className="flex flex-row lg:flex-col items-center gap-2 lg:gap-3 w-full lg:w-20 flex-shrink-0">
              <button className="hidden lg:block text-gray-400 hover:text-[#00B207] transition cursor-pointer">
                <FaChevronUp />
              </button>
              
              {/* Thumbnails: Horizontal scroll on mobile, Vertical on desktop */}
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-y-auto hide-scrollbar flex-1 py-1 w-full lg:w-auto">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img.url)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-md border-2 cursor-pointer p-1 transition-all ${mainImage === img.url ? 'border-[#00B207]' : 'border-gray-200 hover:border-[#00B207]'}`}
                  >
                    <img src={img.url} alt="thumbnail" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              
              <button className="hidden lg:block text-gray-400 hover:text-[#00B207] transition cursor-pointer">
                <FaChevronDown />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2 lg:p-4 bg-white h-[200px] sm:h-[300px] lg:h-full">
              <img src={mainImage} alt={prodTitle} className="max-w-full max-h-full object-contain" />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center lg:w-1/2 font-pop text-[#1a1a1a]">

            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-2 pr-8 lg:pr-0">
              <h2 className="text-[18px] sm:text-[22px] lg:text-3xl font-semibold leading-[120%]">{prodTitle}</h2>
              {product.stock > 0 ? (
                <span className="bg-[#e6f7e6] text-[#00B207] text-[10px] lg:text-xs font-medium px-2 py-0.5 lg:px-2.5 lg:py-1 rounded shrink-0">{t('details.in_stock', 'In Stock')}</span>
              ) : (
                <span className="bg-[#f5e1e1] text-[#ea4b48] text-[10px] lg:text-xs font-medium px-2 py-0.5 lg:px-2.5 lg:py-1 rounded shrink-0">{t('details.out_of_stock', 'Out of Stock')}</span>
              )}
            </div>

            <div className="flex items-center gap-2 lg:gap-4 text-[12px] lg:text-sm text-gray-500 mb-3 lg:mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating || product.averageRating)}
                <span className="ml-1 text-[#1a1a1a]">{product.totalRatings || 0} {t('details.review', 'Review')}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div><span className="font-medium text-[#1a1a1a]">SKU:</span> {product.sku || "2,51,594"}</div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-5 pb-4 lg:pb-5 border-b border-gray-100">
              {product.discountPercentage > 0 && (
                <span className="text-[16px] lg:text-xl text-gray-400 line-through">
                  {formatPrice(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
              <span className="text-[20px] lg:text-2xl font-semibold text-[#00B207]">
                {formatPrice(product.price)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="bg-[#f5e1e1] text-[#ea4b48] text-[10px] lg:text-xs font-semibold px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full">
                  {product.discountPercentage}% {t('details.off', 'Off')}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 lg:mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[13px] lg:text-sm font-medium">{t('details.brand', 'Brand')}:</span>
                <div className="px-2 lg:px-3 h-7 lg:h-8 border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[#00B207] font-semibold text-[11px] lg:text-xs capitalize">{product.brand || t('details.local', 'Local')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-[13px] lg:text-sm font-medium">{t('details.share', 'Share item')}:</span>
                <div className="flex gap-1.5 lg:gap-2">
                  <button className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaFacebookF size={12} className="lg:text-[14px]" /></button>
                  <button className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaTwitter size={12} className="lg:text-[14px]" /></button>
                  <button className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaPinterestP size={12} className="lg:text-[14px]" /></button>
                  <button className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-transparent text-[#4D4D4D] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-all duration-300 cursor-pointer"><FaInstagram size={12} className="lg:text-[14px]" /></button>
                </div>
              </div>
            </div>

            <p className="text-[#666666] text-[12px] lg:text-sm leading-[160%] lg:leading-relaxed mb-5 lg:mb-6 line-clamp-3">
              {prodDesc || "No description available for this product."}
            </p>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:gap-4 mb-5 lg:mb-6 pb-5 lg:pb-6 border-b border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-full h-10 lg:h-12 w-28 lg:w-32 px-3 lg:px-4 justify-between shrink-0">
                <button onClick={() => handleQuantity('dec')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50 cursor-pointer"><FiMinus size={14} className="lg:text-[16px]" /></button>
                <span className="font-medium text-[13px] lg:text-base">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50 cursor-pointer"><FiPlus size={14} className="lg:text-[16px]" /></button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={
                  product.stock < 1 ||
                  addToCartMutation.isPending
                }
                className="flex-1 h-10 lg:h-12 bg-[#00B207] text-white rounded-full text-[13px] lg:text-base font-semibold flex items-center justify-center gap-2 hover:bg-[#009206] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 px-2"
              >
                {addToCartMutation.isPending
                  ? t('hot_deals.adding', "Adding...")
                  : t('details.add_to_cart', "Add to Cart")}

                <HiOutlineShoppingBag size={18} className="lg:text-[20px]" />
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={addToWishlistMutation.isPending}
                className="h-10 w-10 lg:h-12 lg:w-12 bg-[#e6f7e6] text-[#00B207] rounded-full flex items-center justify-center hover:bg-[#00B207] hover:text-white transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                <AiOutlineHeart size={18} className="lg:text-[22px]" />
              </button>
            </div>

            <div className="space-y-1.5 lg:space-y-2">
              <p className="text-[12px] lg:text-sm"><span className="font-medium text-[#1a1a1a]">{t('details.category', 'Category')}:</span> <span className="text-gray-500 capitalize">{product.category}</span></p>
              {currentTags.length > 0 && (
                <p className="text-[12px] lg:text-sm"><span className="font-medium text-[#1a1a1a]">{t('details.tag', 'Tag')}:</span> <span className="text-gray-500 capitalize">{currentTags.join(", ")}</span></p>
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