import api from "../api/api";

export const addToCart = async ({
  productId,
  quantity = 1,
}) => {
  const { data } = await api.post("/cart/add", {
    productId,
    quantity,
  });

  return data.data;
};

export const getCart = async () => {
  const { data } = await api.get("/cart");

  return data.data;
};

export const updateCartItem = async ({
  productId,
  quantity,
}) => {
  const { data } = await api.put("/cart/update", {
    productId,
    quantity,
  });

  return data.data;
};

export const removeCartItem = async (
  productId
) => {
  const { data } = await api.delete(
    `/cart/remove/${productId}`
  );

  return data.data;
};

export const applyCoupon = async (code) => {
  const { data } = await api.post(
    "/cart/apply-coupon",
    {
      code,
    }
  );

  return data.data;
};

export const removeCoupon = async () => {
  const { data } = await api.delete(
    "/cart/remove-coupon"
  );

  return data.data;
};

export const clearCart = async () => {
  const { data } = await api.delete(
    "/cart/clear"
  );

  return data.data;
};