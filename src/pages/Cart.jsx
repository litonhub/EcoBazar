import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageBanner from '../components/common/PageBanner';
import { useTranslation } from 'react-i18next';

import {
  getCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon
} from '../services/cartService';
import Container from '../components/layouts/Container';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [couponCode, setCouponCode] = useState('');

  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const cartItems = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;
  const discount =
    cartData?.couponDiscount ||
    cartData?.discount ||
    0;
  const shipping = cartData?.shipping || 0;
  const total = cartData?.total || 0;
  const appliedCoupon =
    cartData?.coupon?.code?.trim()
      ? cartData.coupon
      : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantityMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    },
  });

  const updatingId = updateQuantityMutation.variables?.productId;

  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success('Item removed from cart');
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    },
  });

  const applyCouponMutation = useMutation({
    mutationFn: applyCoupon,
    onSuccess: () => {
      toast.success('Coupon applied successfully');
      setCouponCode('');
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid or expired coupon');
    },
  });

  const removeCouponMutation = useMutation({
    mutationFn: removeCoupon,
    onSuccess: () => {
      toast.info('Coupon removed');
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove coupon');
    },
  });

  const handleUpdateQuantity = (productId, currentQuantity, stock, type) => {
    let newQuantity = currentQuantity;

    if (type === 'inc') {
      if (currentQuantity >= stock) {
        toast.warning(`Only ${stock} items available in stock.`);
        return;
      }
      newQuantity += 1;
    } else if (type === 'dec' && currentQuantity > 1) {
      newQuantity -= 1;
    } else {
      return; 
    }

    updateQuantityMutation.mutate({ productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId) => {
    removeItemMutation.mutate(productId);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      return toast.warning('Please enter a coupon code.');
    }
    applyCouponMutation.mutate(couponCode.trim());
  };

  const handleRemoveCoupon = () => {
    removeCouponMutation.mutate();
  };

  const handleUpdateCart = () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"]
    });

    toast.success("Cart Updated");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00B207] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="text-red-500 mb-4">Something went wrong while loading your cart.</p>
        <button
          onClick={() => queryClient.invalidateQueries({
            queryKey: ["cart"],
          })}
          className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <PageBanner
        items={[
          t('cart.shopping_cart', "Shopping cart"),
        ]}
      />

      <section className="pt-10 pb-20 bg-white font-pop text-[#1a1a1a]">
        <Container>
          <h2 className="text-[32px] font-semibold text-center mb-10 text-gray-900">{t('cart.title', 'My Shopping Cart')}</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 border border-gray-200 rounded-xl bg-gray-50">
              <h3 className="text-2xl font-medium text-gray-600 mb-4">{t('cart.empty', 'Your cart is currently empty.')}</h3>
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3 bg-[#00B207] text-white rounded-full font-semibold hover:bg-[#009206] transition"
              >
                {t('cart.return_shop', 'Return to shop')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              <div className="w-full lg:w-[68%] flex flex-col gap-6">

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200 text-[#808080] text-[13px] font-medium uppercase tracking-wider">
                          <th className="py-4 px-6 font-medium">{t('cart.product', 'Product')}</th>
                          <th className="py-4 px-6 font-medium">{t('cart.price', 'Price')}</th>
                          <th className="py-4 px-6 font-medium text-center">{t('cart.quantity', 'Quantity')}</th>
                          <th className="py-4 px-6 font-medium text-right">{t('cart.subtotal', 'Subtotal')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => {
                          const prodId = item.product?._id;
                          const stock = item.product?.stock || 0;

                          return (
                            <tr key={prodId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-[70px] h-[70px] flex-shrink-0 flex items-center justify-center">
                                    <img
                                      src={item.thumbnail || "https://placehold.co/70x70"}
                                      alt={typeof item.title === 'object' ? item.title[i18n.language] || item.title.en : item.title}
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
                                  <span className="font-medium text-[#1a1a1a] text-[15px]">
                                    {typeof item.title === 'object' ? (item.title[i18n.language] || item.title.en) : item.title}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-[#1a1a1a] text-[15px] font-medium">
                                ${Number(item.price).toFixed(2)}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center justify-center">
                                  <div className="flex items-center border border-gray-200 rounded-full h-[42px] w-[110px] px-2 bg-white">
                                    <button
                                      onClick={() => handleUpdateQuantity(prodId, item.quantity, stock, 'dec')}
                                      disabled={updateQuantityMutation.isPending}
                                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100 disabled:opacity-50"
                                    >
                                      <FiMinus size={16} />
                                    </button>
                                    <span className="flex-1 text-center font-medium text-[15px] text-[#1a1a1a]">
                                      {
                                        updateQuantityMutation.isPending &&
                                          updatingId === prodId
                                          ?
                                          "..."
                                          :
                                          item.quantity
                                      }
                                    </span>
                                    <button
                                      onClick={() => handleUpdateQuantity(prodId, item.quantity, stock, 'inc')}
                                      disabled={updateQuantityMutation.isPending}
                                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100 disabled:opacity-50"
                                    >
                                      <FiPlus size={16} />
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-right font-medium text-[#1a1a1a] text-[15px]">
                                <div className="flex items-center justify-end gap-6">
                                  ${(item.price * item.quantity).toFixed(2)}
                                  <button
                                    onClick={() => handleRemoveItem(prodId)}
                                    disabled={
                                      removeItemMutation.isPending &&
                                      removeItemMutation.variables === prodId
                                    }
                                    className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors disabled:opacity-50"
                                  >
                                    <IoCloseOutline size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate('/shop')}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F2F2F2] text-[#1a1a1a] font-medium text-[14px] hover:bg-gray-200 transition-colors"
                    >
                      {t('cart.return_shop', 'Return to shop')}
                    </button>
                    <button
                      onClick={handleUpdateCart}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F2F2F2] text-[#1a1a1a] font-medium text-[14px] hover:bg-gray-200 transition-colors"
                    >
                      {t('cart.update_cart', 'Update Cart')}
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                  <span className="text-[18px] font-medium text-[#1a1a1a] shrink-0">{t('cart.coupon_code', 'Coupon Code')}</span>
                  {appliedCoupon ? (
                    <div className="flex w-full sm:max-w-lg relative items-center justify-between bg-green-50 border border-green-200 rounded-full px-6 py-3">
                      <span className="text-green-700 font-medium">
                        Coupon: {appliedCoupon.code}
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        disabled={removeCouponMutation.isPending}
                        className="text-red-500 hover:underline text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex w-full sm:max-w-lg relative">
                      <input
                        type="text"
                        placeholder={t('cart.enter_code', 'Enter code')}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full border border-gray-200 rounded-full h-[52px] pl-6 pr-40 outline-none focus:border-[#00B207] text-[#1a1a1a] transition-colors uppercase"
                      />
                      <button
                        type="submit"
                        disabled={applyCouponMutation.isPending}
                        className="absolute right-0 top-0 h-[52px] px-8 bg-[#333333] text-white rounded-full font-medium text-[15px] hover:bg-black transition-colors disabled:opacity-70"
                      >
                        {applyCouponMutation.isPending ? t('cart.applying', 'Applying...') : t('cart.apply_coupon', 'Apply Coupon')}
                      </button>
                    </form>
                  )}
                </div>

              </div>

              <div className="w-full lg:w-[32%] border border-gray-200 rounded-lg p-6 bg-white shrink-0">
                <h3 className="text-xl font-medium text-[#1a1a1a] mb-6">{t('cart.cart_total', 'Cart Total')}</h3>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-[#666666] text-[15px]">{t('cart.subtotal', 'Subtotal')}:</span>
                  <span className="font-medium text-[#1a1a1a] text-[15px]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-[#666666] text-[15px]">{t('cart.shipping', 'Shipping')}:</span>
                  <span className="font-medium text-[#1a1a1a] text-[15px]">{shipping === 0 ? t('cart.free', 'Free') : `$${shipping.toFixed(2)}`}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-[#666666] text-[15px]">{t('cart.discount', 'Discount')}:</span>
                    <span className="font-medium text-red-500 text-[15px]">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-4 mb-4">
                  <span className="text-[#1a1a1a] text-[16px] font-medium">{t('cart.total', 'Total')}:</span>
                  <span className="font-bold text-[#1a1a1a] text-[18px]">${total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full h-[52px] bg-[#00B207] text-white rounded-full font-semibold text-[15px] hover:bg-[#009206] transition-colors flex items-center justify-center"
                >
                  {t('cart.proceed', 'Proceed to checkout')}
                </Link>
              </div>

            </div>
          )}
        </Container>
      </section>

    </>
  );
};

export default Cart;