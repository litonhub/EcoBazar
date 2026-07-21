import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Container from '../components/layouts/Container';
import PageBanner from '../components/common/PageBanner';
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getDefaultAddress,
} from "../services/addressService";
import { getCart } from "../services/cartService";
import { countries } from "../data/countries";
import { createOrder } from "../services/orderService";
import { initPayment } from "../services/paymentService";
import { useNavigate } from 'react-router';

const Checkout = () => {

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    label: "Home",
  });

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
  });

  const paymentMutation = useMutation({
    mutationFn: initPayment,
  });

  const {
    data: addressData,
    isLoading: addressLoading,
  } = useQuery({
    queryKey: ["default-address"],
    queryFn: getDefaultAddress,
  });

  const {
    data: cartData,
    isLoading: cartLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const selectedCountry = countries.find(
    (country) => country.name === billing.country
  );

  const selectedShippingCountry = countries.find(
    (country) => country.name === shipping.country
  );

  const [shipToDifferent, setShipToDifferent] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    if (!addressData) return;
    
    // Extract actual data if nested
    const defaultAddress = addressData.data || addressData;

    setBilling({
      firstName: defaultAddress.firstName || "",
      lastName: defaultAddress.lastName || "",
      companyName: defaultAddress.companyName || "",
      email: defaultAddress.email || "",
      phone: defaultAddress.phone || "",
      country: defaultAddress.country?.name || "",
      state: defaultAddress.state?.name || "",
      city: defaultAddress.city || "",
      street: defaultAddress.street || "",
      zipCode: defaultAddress.zipCode || "",
    });
  }, [addressData]);

  if (addressLoading || cartLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </Container>
      </section>
    );
  }

  const getOrderItems = () => {
    return (
      cartData?.items?.map((item) => ({
        product: item.product?._id || item.product,
        quantity: item.quantity,
      })) || []
    );
  };

  const handlePlaceOrder = async () => {
    try {
      // =========================
      // Validation
      // =========================

      if (!billing.firstName) return toast.error("First name is required.");
      if (!billing.lastName) return toast.error("Last name is required.");
      if (!billing.email) return toast.error("Email is required.");
      if (!billing.phone) return toast.error("Phone is required.");
      if (!billing.country) return toast.error("Country is required.");
      if (!billing.state) return toast.error("State is required.");
      if (!billing.city) return toast.error("City is required.");
      if (!billing.street) return toast.error("Street is required.");

      if (shipToDifferent) {
        if (!shipping.firstName) return toast.error("Shipping First name is required.");
        if (!shipping.lastName) return toast.error("Shipping Last name is required.");
        if (!shipping.street) return toast.error("Shipping Street is required.");
        if (!shipping.city) return toast.error("Shipping City is required.");
        if (!shipping.country) return toast.error("Shipping Country is required.");
      }

      // =========================
      // Target Address for Order
      // =========================
      // If "Ship to different address" is NOT checked, use billing address for shipping
      const finalShippingAddress = shipToDifferent ? {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        phone: shipping.phone || billing.phone, // fallback to billing if empty
        country: shipping.country,
        state: shipping.state,
        city: shipping.city,
        street: shipping.street,
        zipCode: shipping.zipCode,
      } : {
        firstName: billing.firstName,
        lastName: billing.lastName,
        phone: billing.phone,
        country: billing.country,
        state: billing.state,
        city: billing.city,
        street: billing.street,
        zipCode: billing.zipCode,
      };

      // =========================
      // Create Order
      // =========================
      // CheckOut form data only sent for this specific order, 
      // without updating the User's permanent Default Address in Settings.
      const orderRes = await createOrderMutation.mutateAsync({
        orderItems: getOrderItems(),
        shippingAddress: finalShippingAddress,
        billingAddress: {
          firstName: billing.firstName,
          lastName: billing.lastName,
          phone: billing.phone,
          country: billing.country,
          state: billing.state,
          city: billing.city,
          street: billing.street,
          zipCode: billing.zipCode,
        },
        paymentMethod,
      });

      const orderId = orderRes.data._id;

      // =========================
      // COD
      // =========================
      if (paymentMethod === "cod") {
        toast.success("Order placed successfully.");
        navigate(`/track-order?orderId=${orderId}`);
        return;
      }

      // =========================
      // SSLCommerz
      // =========================
      const paymentRes = await paymentMutation.mutateAsync(orderId);
      window.location.href = paymentRes.data.gatewayUrl;

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <>
      <PageBanner
        items={[
          "Shopping Cart",
          "Checkout",
        ]}
      />

      <section className="pt-10 pb-20 bg-white font-pop text-logoc">
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
            className="flex flex-col lg:flex-row gap-8 items-start"
          >

            {/* --- Left Side: Forms --- */}
            <div className="flex-1 w-full lg:w-[65%]">

              {/* Billing Information */}
              <div className="mb-8">
                <h2 className="text-[24px] font-medium mb-6">Billing Information</h2>

                {/* Row 1: Names & Company */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[14px] mb-1.5">First name</label>
                    <input
                      type="text"
                      placeholder="Your first name"
                      value={billing.firstName}
                      onChange={(e) => setBilling({ ...billing, firstName: e.target.value })}
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] mb-1.5">Last name</label>
                    <input
                      type="text"
                      placeholder="Your last name"
                      value={billing.lastName}
                      onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] mb-1.5">
                      Company Name <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={billing.companyName || ""}
                      onChange={(e) => setBilling({ ...billing, companyName: e.target.value })}
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Street Address */}
                <div className="mb-4">
                  <label className="block text-[14px] mb-1.5">Street Address</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={billing.street}
                    onChange={(e) => setBilling({ ...billing, street: e.target.value })}
                    className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors"
                  />
                </div>

                {/* Row 3: Country, State, City, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-[14px] mb-1.5">Country</label>
                    <div className="relative">
                      <select value={billing.country}
                        onChange={(e) => setBilling({ ...billing, country: e.target.value, state: "" })}
                        className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] appearance-none bg-white cursor-pointer transition-colors"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>{country.name}</option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">States</label>
                    <div className="relative">
                      <select value={billing.state}
                        onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                        className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] appearance-none bg-white cursor-pointer transition-colors"
                      >
                        <option value="">Select State</option>
                        {selectedCountry?.states?.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">City</label>
                    <input
                      type="text"
                      value={billing.city}
                      onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                      placeholder="City"
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">Zip Code</label>
                    <input
                      type="text"
                      value={billing.zipCode}
                      onChange={(e) => setBilling({ ...billing, zipCode: e.target.value })}
                      placeholder="Zip Code"
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]"
                    />
                  </div>
                </div>

                {/* Row 4: Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[14px] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={billing.email}
                      onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                      placeholder="Email Address"
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">Phone</label>
                    <input
                      type="text"
                      value={billing.phone}
                      onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                      placeholder="Phone Number"
                      className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]"
                    />
                  </div>
                </div>

                {/* Ship to a different address Checkbox */}
                <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setShipToDifferent(!shipToDifferent)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${shipToDifferent ? 'bg-[#00B207] border-[#00B207]' : 'border-gray-300 bg-white'}`}>
                    {shipToDifferent && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-[#4d4d4d] select-none">Ship to a different address</span>
                </div>
              </div>

              {/* --- Shipping Address Form --- */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${shipToDifferent ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 opacity-0 m-0'}`}>
                <h2 className="text-[20px] font-medium mb-6 text-logoc">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[14px] mb-1.5">First name</label>
                    <input type="text" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} placeholder="First name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">Last name</label>
                    <input type="text" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} placeholder="Last name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[14px] mb-1.5">Street Address</label>
                  <input type="text" value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} placeholder="Shipping Street Address" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-[14px] mb-1.5">Country</label>
                    <div className="relative">
                      <select value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value, state: "" })} className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] bg-white appearance-none">
                        <option value="">Select</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>{country.name}</option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">States</label>
                    <div className="relative">
                      <select value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] bg-white appearance-none">
                        <option value="">Select</option>
                        {selectedShippingCountry?.states?.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">City</label>
                    <input type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="City" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                  </div>
                  <div>
                    <label className="block text-[14px] mb-1.5">Zip Code</label>
                    <input type="text" value={shipping.zipCode} onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })} placeholder="Zip Code" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-100 pt-8">
                <h2 className="text-[24px] font-medium mb-6">Additional Info</h2>
                <div>
                  <label className="block text-[14px] mb-1.5 text-logoc">Order Notes (Optional)</label>
                  <textarea
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="w-full h-[120px] p-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] resize-none transition-colors"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* --- Right Side: Order Summary --- */}
            <div className="w-full lg:w-[420px] shrink-0 border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="text-[20px] font-medium text-logoc mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartData?.items?.map((item) => (
                  <div key={item._id || item.product?._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[50px] h-[50px] bg-white rounded border border-gray-100 flex items-center justify-center p-1">
                        <img
                          src={item.product?.thumbnail?.url || item.thumbnail}
                          alt={item.product?.title || item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[14px] text-[#4d4d4d] font-medium">
                        {item.product?.title || item.title} × {item.quantity}
                      </span>
                    </div>
                    <span className="text-[14px] font-medium text-logoc">
                      ${((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal & Shipping */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gry text-[14px]">Subtotal:</span>
                <span className="font-medium text-logoc text-[14px]">${Number(cartData?.subtotal || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gry text-[14px]">Shipping:</span>
                <span className="font-medium text-logoc text-[14px]">
                  {Number(cartData?.shipping || 0) === 0 ? "Free" : `$${Number(cartData?.shipping).toFixed(2)}`}
                </span>
              </div>

              {Number(cartData?.discount || cartData?.couponDiscount || 0) > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gry text-[14px]">Discount:</span>
                  <span className="font-medium text-red-500 text-[14px]">
                    -${Number(cartData?.discount || cartData?.couponDiscount).toFixed(2)}
                  </span>
                </div>
              )}

              {Number(cartData?.tax || 0) > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gry text-[14px]">Tax:</span>
                  <span className="font-medium text-logoc text-[14px]">${Number(cartData?.tax).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-4 mb-6">
                <span className="text-logoc text-[16px] font-normal">Total:</span>
                <span className="font-bold text-logoc text-[20px]">${Number(cartData?.total || 0).toFixed(2)}</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-[20px] font-medium text-logoc mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setPaymentMethod('cod')}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-[#00B207]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-[#00B207] rounded-full"></div>}
                    </div>
                    <span className={`text-[14px] ${paymentMethod === 'cod' ? 'text-logoc' : 'text-gry'}`}>Cash on Delivery</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setPaymentMethod('sslcommerz')}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'sslcommerz' ? 'border-[#00B207]' : 'border-gray-300'}`}>
                      {paymentMethod === 'sslcommerz' && <div className="w-2.5 h-2.5 bg-[#00B207] rounded-full"></div>}
                    </div>
                    <span className={`text-[14px] ${paymentMethod === 'sslcommerz' ? 'text-logoc' : 'text-gry'}`}>SSLCommerz (Card/Mobile Banking)</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={createOrderMutation.isPending || paymentMutation.isPending}
                className="w-full h-[52px] bg-[#00B207] text-white rounded-full font-semibold text-[15px] hover:bg-[#009206] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {createOrderMutation.isPending || paymentMutation.isPending ? "Processing..." : "Place Order"}
              </button>
            </div>

          </form>
        </Container>
      </section>

    </>
  );
};

export default Checkout;