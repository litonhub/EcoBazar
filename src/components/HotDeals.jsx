import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import Container from "./layouts/Container";
import CountdownTimer from "./common/CountdownTimer";
import { getProducts } from "../api/productApi";
import ProductQuickView from "../components/ProductQuickView";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext"; // <-- Currency Context Import

const HotDeals = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency(); // <-- formatPrice Hook

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success("Product added to cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      window.dispatchEvent(new Event("open-cart-sidebar"));
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        "Failed to add product"
      );
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      toast.success("Product added to wishlist");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        "Failed to add product to wishlist"
      );
    },
  });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();

    addToCartMutation.mutate({
      productId: product._id,
      quantity: 1,
    });
  };

  const handleAddToWishlist = (product, e) => {
    e.stopPropagation();

    addToWishlistMutation.mutate({
      productId: product._id,
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        hotDeals: true,
        limit: 12,
      });

      setProducts(res.data.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating = 0) => {
    const validRating = Number(rating) || 0;
    const stars = [];
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FF8A00]" size={14} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FF8A00]" size={14} />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-[#FF8A00]" size={14} />);
    }

    return stars;
  };

  const handleOpenModal = (item, e) => {
    e.stopPropagation();
    setSelectedProduct(item);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <section className="py-15 bg-[#F7F7F7]">
        <Container>
          <div className="py-20 text-center text-gray-500 font-medium">
            {t('hot_deals.loading', 'Loading Hot Deals...')}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-15 bg-[#F7F7F7]">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pop font-semibold text-3xl text-gray-900 leading-[120%]">
            {t('hot_deals.title', 'Hot Deals')}
          </h2>
          <Link to="/allhotdeals" className="flex items-center gap-x-2 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer hover:underline">
            {t('hot_deals.view_all', 'View All')}
            <FaArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 -mr-px -mb-px">
          {Array.isArray(products) && products.map((item, index) => {
            if (!item) return null;

            const isFeatured = index === 0;

            if (isFeatured) {
              return (
                <div
                  key={item._id || index}
                  onClick={() => navigate(`/product-details/${item.slug}`)}
                  className="group relative col-span-2 row-span-2 border border-brdrtwo -mr-px -mb-px bg-white p-6 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] transition-all duration-300 z-10 flex flex-col justify-between cursor-pointer"
                >
                  <div className="absolute top-6 left-6 flex gap-2 z-20">
                    {item?.discountPercentage > 0 && (
                      <span className="bg-[#EA4B48] text-white defaultfs px-2 py-0.75 rounded">
                        {t('hot_deals.sale', 'Sale')} {item.discountPercentage}%
                      </span>
                    )}
                    {item?.bestSeller && (
                      <span className="bg-badgeblue text-white defaultfs px-2 py-0.75 rounded">
                        {t('hot_deals.best_sale', 'Best Sale')}
                      </span>
                    )}
                  </div>

                  <div className="grow flex items-center justify-center pt-8 pb-4">
                    <img
                      src={item?.thumbnail?.url || "/placeholder.png"}
                      alt={typeof item?.title === 'object' ? (item.title[i18n.language] || item.title.en) : (item?.title || "Product Image")}
                      className="max-h-72 object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-x-2 mb-6 z-20">
                    <button
                      onClick={(e) => handleAddToWishlist(item, e)}
                      disabled={addToWishlistMutation.isPending}
                      className="w-12 h-12 rounded-full cursor-pointer text-logoc bg-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                    >
                      <AiOutlineHeart size={20} />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      disabled={addToCartMutation.isPending}
                      className="flex-1 py-3.5 bg-primary text-white text-[14px] font-pop rounded-full flex items-center justify-center gap-x-3 font-semibold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <span>
                        {addToCartMutation.isPending ? t('hot_deals.adding', 'Adding...') : t('hot_deals.add_to_cart', 'Add to Cart')}
                      </span>

                      <HiOutlineShoppingBag size={18} />
                    </button>
                    <button
                      onClick={(e) => handleOpenModal(item, e)}
                      className="w-12 h-12 rounded-full cursor-pointer text-logoc bg-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <AiOutlineEye size={20} />
                    </button>
                  </div>

                  <div className="text-center pb-4">
                    <h3 className="font-pop font-normal text-[18px] text-[#4d4d4d] leading-[150%] mb-2 transition-colors duration-300 group-hover:text-[#2C742F] line-clamp-2">
                      {typeof item?.title === 'object' ? (item.title[i18n.language] || item.title.en) : (item?.title || "Unnamed Product")}
                    </h3>
                    <div className="flex items-center justify-center gap-2 font-pop text-xl mb-2">
                      {/* --- Updated Pricing with formatPrice --- */}
                      <span className="font-pop font-medium text-[24px] leading-[150%] text-logoc">
                        {formatPrice(item?.price)}
                      </span>
                      {item?.discountPercentage > 0 && (
                        <span className="line-through font-pop font-normal text-[24px] leading-[150%] text-grynine">
                          {formatPrice(Number(item.price) / (1 - item.discountPercentage / 100))}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4.5">
                      <div className="flex gap-1">
                        {renderStars(item?.rating)}
                      </div>
                      <span className="font-pop font-normal text-[14px] leading-[130%] text-gryd">
                        (524 Feedback)
                      </span>
                    </div>

                    <div>
                      <h6 className="font-pop font-normal text-[14px] leading-4.5 text-grynine">{t('hot_deals.hurry_up', 'Hurry up! Offer ends In:')}</h6>
                      <CountdownTimer
                        endDate={new Date("2027-01-01")}
                        wrapperClass="mt-1.5"
                        numberClass="font-pop font-medium text-[18px] text-logoc leading-[150%]"
                        separatorClass="font-pop font-normal text-[20px] text-gryd leading-[27px]"
                        labelClass="font-pop font-medium text-[12px] text-grynine leading-[100%] traking-[3%]"
                        numberGap="gap-5"
                        labelGap="gap-8"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item._id || index}
                onClick={() => navigate(`/product-details/${item.slug}`)}
                className="group relative border border-gray-200 -mr-px -mb-px bg-white transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] hover:z-10 cursor-pointer flex flex-col p-4"
              >
                {item?.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-[#EA4B48] text-white defaultfs px-2 py-0.75 rounded z-10">
                    {t('hot_deals.sale', 'Sale')} {item.discountPercentage}%
                  </span>
                )}

                <div className="grow flex items-center justify-center mb-4 min-h-35">
                  <img
                    src={item?.thumbnail?.url || "/placeholder.png"}
                    alt={typeof item?.title === 'object' ? (item.title[i18n.language] || item.title.en) : (item?.title || "Product")}
                    className="max-h-32 object-contain"
                  />
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300 z-20">
                  <button
                    onClick={(e) => handleAddToWishlist(item, e)}
                    disabled={addToWishlistMutation.isPending}
                    className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white shadow border border-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white disabled:opacity-50"
                  >
                    <AiOutlineHeart />
                  </button>
                  <button
                    onClick={(e) => handleOpenModal(item, e)}
                    className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white border border-[#f2f2f2] shadow flex items-center justify-center hover:bg-primary hover:text-white"
                  >
                    <AiOutlineEye />
                  </button>
                </div>

                <div className="mt-auto">
                  <h3 className="font-pop font-normal text-[14px] leading-[150%] text-[#4d4d4d] group-hover:text-[#2C742F] transition-colors line-clamp-1">
                    {typeof item?.title === 'object' ? (item.title[i18n.language] || item.title.en) : (item?.title || "Unnamed Product")}
                  </h3>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-2 font-pop">
                        {/* --- Updated Pricing with formatPrice --- */}
                        <span className="font-pop font-medium text-[16px] leading-[150%] text-logoc">
                          {formatPrice(item?.price)}
                        </span>
                        {item?.discountPercentage > 0 && (
                          <span className="line-through font-pop font-normal text-[16px] leading-[150%] text-gryd">
                            {formatPrice(Number(item.price) / (1 - item.discountPercentage / 100))}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(item?.rating)}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      disabled={addToCartMutation.isPending}
                      className="absolute bottom-6 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-logoc flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white hover:bg-primary hover:text-white cursor-pointer z-20 disabled:opacity-60"
                    >
                      <HiOutlineShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <ProductQuickView
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default HotDeals;