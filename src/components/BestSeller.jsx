import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import Container from "./layouts/Container";
import { getProducts } from "../api/productApi";
import ProductQuickView from "../components/ProductQuickView";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext"; // <-- Currency Context Import

const BestSeller = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency(); // <-- formatPrice Hook

  const [products, setProducts] = useState([]);
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

      // Sidebar Open
      window.dispatchEvent(new Event("open-cart-sidebar"));
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        "Failed to add product"
      );
    },
  });

  const wishlistMutation = useMutation({
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
        "Failed to add wishlist"
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

    wishlistMutation.mutate({
      productId: product._id,
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts({
        bestSeller: true,
        limit: 10,
      });

      setProducts(res.data.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  // Modal Open/Close Handlers
  const handleOpenModal = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-pop text-hsize font-semibold leading-[120%] text-logoc">
            {t('best_sellers.title', 'Best Seller Products')}
          </h2>

          <button
            onClick={() => navigate('/shop')}
            className="flex cursor-pointer items-center gap-x-3 font-pop text-[16px] font-medium leading-[150%] text-primary"
          >
            {t('best_sellers.view_all', 'View All')}
            <FaArrowRight size={15} />
          </button>
        </div>

        <div className="-mb-px -mr-px grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product-details/${item.slug}`)}
              className="group relative -mb-px -mr-px cursor-pointer overflow-hidden border border-brdrtwo bg-white transition-all duration-300 hover:z-10 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)]"
            >
              {item.discountPercentage > 0 && (
                <span className="defaultfs absolute left-4 top-4 rounded bg-[#EA4B48] px-2 py-1 text-white z-10">
                  {t('best_sellers.sale', 'Sale')} {item.discountPercentage}%
                </span>
              )}

              <div className="absolute right-4 top-4 flex flex-col gap-3 opacity-0 transition duration-300 group-hover:opacity-100 z-10">
                <button
                  onClick={(e) => handleAddToWishlist(item, e)}
                  disabled={wishlistMutation.isPending}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#f2f2f2] bg-white text-logoc shadow hover:bg-primary hover:text-white disabled:opacity-50"
                >
                  <AiOutlineHeart />
                </button>

                <button
                  onClick={(e) => handleOpenModal(item, e)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#f2f2f2] bg-white text-logoc shadow hover:bg-primary hover:text-white"
                >
                  <AiOutlineEye />
                </button>
              </div>

              <img
                src={item.thumbnail?.url}
                alt={typeof item.title === 'object' ? (item.title[i18n.language] || item.title.en) : item.title}
                className="h-57.5 mx-auto object-contain px-1.25 pt-1.25"
              />

              <div className="mb-3 mt-4.25 px-3">
                <h3 className="defaultfs text-[#4d4d4d] transition-colors duration-300 group-hover:text-[#2C742F] line-clamp-1">
                  {typeof item.title === 'object' ? (item.title[i18n.language] || item.title.en) : item.title}
                </h3>

                <div className="flex items-center gap-2 font-pop text-[16px] leading-[150%]">
                  {/* --- Updated Pricing with formatPrice --- */}
                  <span className="font-medium text-logoc">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-orange-400">
                  {renderStars(item.rating || item.averageRating)}
                </div>
              </div>

              <button
                onClick={(e) => handleAddToCart(item, e)}
                disabled={addToCartMutation.isPending}
                className="absolute bottom-6 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] text-logoc transition-all duration-300 group-hover:bg-green-500 group-hover:text-white z-10 disabled:opacity-50"
              >
                <HiOutlineShoppingBag />
              </button>
            </div>
          ))}
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

export default BestSeller;