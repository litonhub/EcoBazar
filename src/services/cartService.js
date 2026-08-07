import api from "../api/api";

export const addToCart = async ({ productId, quantity = 1, product }) => {
  const token = localStorage.getItem("accessToken");
  
  if (token) {
    const { data } = await api.post("/cart/add", { productId, quantity });
    return data.data;
  } else {
    let cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const existing = cart.find((item) => (item.product?._id || item.product) === productId);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        product: product || { _id: productId }, 
        quantity,
        price: product?.price || 0,
        discountPercentage: product?.discountPercentage || 0,
        title: product?.title || "",
        thumbnail: product?.thumbnail?.url || product?.thumbnail || ""
      });
    }
    
    localStorage.setItem("guestCart", JSON.stringify(cart));
    return { items: cart, totalItems: cart.reduce((acc, item) => acc + item.quantity, 0) };
  }
};

export const getCart = async () => {
  const token = localStorage.getItem("accessToken");
  
  if (token) {
    const { data } = await api.get("/cart");
    return data.data;
  } else {
    // --- GUEST FLOW ---
    const cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => {
        const price = item.price || 0;
        const discount = item.discountPercentage || 0;
        const finalPrice = price - (price * (discount / 100));
        return acc + (finalPrice * item.quantity);
    }, 0);
    
    return { items: cart, totalItems, subtotal };
  }
};

export const updateCartItem = async ({ productId, quantity }) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.put("/cart/update", { productId, quantity });
    return data.data;
  } else {
    let cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const item = cart.find((item) => (item.product?._id || item.product) === productId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem("guestCart", JSON.stringify(cart));
    }
    return { items: cart, totalItems: cart.reduce((acc, i) => acc + i.quantity, 0) };
  }
};

export const removeCartItem = async (productId) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.delete(`/cart/remove/${productId}`);
    return data.data;
  } else {
    let cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    cart = cart.filter((item) => (item.product?._id || item.product) !== productId);
    localStorage.setItem("guestCart", JSON.stringify(cart));
    return { items: cart, totalItems: cart.reduce((acc, i) => acc + i.quantity, 0) };
  }
};

export const applyCoupon = async (code) => {
  const { data } = await api.post("/cart/apply-coupon", { code });
  return data.data;
};

export const removeCoupon = async () => {
  const { data } = await api.delete("/cart/remove-coupon");
  return data.data;
};

export const clearCart = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.delete("/cart/clear");
    return data.data;
  } else {
    localStorage.removeItem("guestCart");
    return { items: [], totalItems: 0 };
  }
};

export const syncGuestCart = async (token) => {
    const cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    if (cart.length === 0) return;

    const localCartItems = cart.map(item => ({
        product: item.product?._id || item.product,
        quantity: item.quantity
    }));

    await api.post("/cart/sync", { localCartItems }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem("guestCart");
};