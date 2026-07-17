import api from "../api/api";

export const getCoupons = async (params) => {
  const { data } = await api.get("/coupons", {
    params,
  });

  return data.data.coupons;
};

export const getCoupon = async (id) => {
  const { data } = await api.get(`/coupons/${id}`);

  return data.data;
};

export const createCoupon = async (payload) => {
  const { data } = await api.post("/coupons", payload);

  return data.data;
};

export const updateCoupon = async ({ id, payload }) => {
  const { data } = await api.put(`/coupons/${id}`, payload);

  return data.data;
};

export const deleteCoupon = async (id) => {
  const { data } = await api.delete(`/coupons/${id}`);
  return data;
};

export const restoreCoupon = async (id) => {
  const { data } = await api.patch(`/coupons/${id}/restore`);
  return data;
};

export const toggleCouponStatus = async (id) => {
  const { data } = await api.patch(`/coupons/${id}/toggle-status`);
  return data;
};

export const permanentDeleteCoupon = async (id) => {
  const { data } = await api.delete(
    `/coupons/${id}/permanent`
  );

  return data;
};