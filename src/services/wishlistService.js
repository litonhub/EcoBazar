import api from "../api/api";

export const getWishlist = async () => {
  const { data } = await api.get("/wishlist");
  return data;
};

export const addToWishlist = async ({ productId }) => {
  const { data } = await api.post("/wishlist/add", {
    productId,
  });
  return data;
};

export const removeFromWishlist = async (productId) => {
  const { data } = await api.delete(`/wishlist/remove/${productId}`);
  return data;
};

export const clearWishlist = async () => {
  const { data } = await api.delete("/wishlist/clear");
  return data;
};