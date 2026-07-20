import api from "../api/api";

// =========================
// Create Order
// =========================
export const createOrder = async (orderData) => {
  const { data } = await api.post(
    "/orders",
    orderData
  );

  return data;
};

// =========================
// My Orders
// =========================
export const getMyOrders = async () => {
  const { data } = await api.get(
    "/orders/my-orders"
  );

  return data;
};

// =========================
// Single Order
// =========================
export const getSingleOrder = async (
  id
) => {
  const { data } = await api.get(
    `/orders/${id}`
  );

  return data;
};

// =========================
// Cancel Order
// =========================
export const cancelOrder = async (
  id
) => {
  const { data } = await api.patch(
    `/orders/${id}/cancel`
  );

  return data;
};

// =========================
// Admin
// =========================
export const getAllOrders = async (
  params
) => {
  const { data } = await api.get(
    "/orders/admin/all",
    {
      params,
    }
  );

  return data;
};

export const updateOrderStatus =
  async (id, payload) => {
    const { data } =
      await api.patch(
        `/orders/admin/${id}/status`,
        payload
      );

    return data;
  };

export const deleteOrder = async (
  id
) => {
  const { data } = await api.delete(
    `/orders/admin/${id}`
  );

  return data;
};