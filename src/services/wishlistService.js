import api from "../api/api";

export const getWishlist = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.get("/wishlist");
    return data;
  } else {
    const wishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
    return { data: { items: wishlist, totalItems: wishlist.length } };
  }
};

export const addToWishlist = async ({ productId, product }) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.post("/wishlist/add", { productId });
    return data;
  } else {
    let wishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
    const existing = wishlist.find((item) => (item.product?._id || item.product) === productId);
    if (!existing) {
      wishlist.push({
        product: product || { _id: productId },
        price: product?.price || 0,
        discountPercentage: product?.discountPercentage || 0,
        title: product?.title || "",
        thumbnail: product?.thumbnail?.url || product?.thumbnail || ""
      });
      localStorage.setItem("guestWishlist", JSON.stringify(wishlist));
    }
    return { data: { items: wishlist, totalItems: wishlist.length } };
  }
};

export const removeFromWishlist = async (productId) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.delete(`/wishlist/remove/${productId}`);
    return data;
  } else {
    let wishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
    wishlist = wishlist.filter((item) => (item.product?._id || item.product) !== productId);
    localStorage.setItem("guestWishlist", JSON.stringify(wishlist));
    return { data: { items: wishlist, totalItems: wishlist.length } };
  }
};

export const clearWishlist = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const { data } = await api.delete("/wishlist/clear");
    return data;
  } else {
    localStorage.removeItem("guestWishlist");
    return { data: { items: [], totalItems: 0 } };
  }
};

export const syncGuestWishlist = async (token) => {
    const wishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
    if (wishlist.length === 0) return;

    const localWishlistItems = wishlist.map(item => ({
        product: item.product?._id || item.product
    }));

    await api.post("/wishlist/sync", { localWishlistItems }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem("guestWishlist");
};