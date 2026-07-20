import api from "../api/api";

// Get all addresses
export const getAddresses = async () => {
  const { data } = await api.get("/address");
  return data.data;
};

// Get default address
export const getDefaultAddress = async () => {
  const { data } = await api.get("/address/default");
  return data.data;
};

// Get single address
export const getAddress = async (id) => {
  const { data } = await api.get(`/address/${id}`);
  return data.data;
};

// Create address
export const createAddress = async (address) => {
  const { data } = await api.post("/address/create", address);
  return data.data;
};

// Update address
export const updateAddress = async ({ id, address }) => {
  const { data } = await api.put(`/address/${id}`, address);
  return data.data;
};

// Delete address
export const deleteAddress = async (id) => {
  const { data } = await api.delete(`/address/${id}`);
  return data.data;
};

// Make default
export const setDefaultAddress = async (id) => {
  const { data } = await api.patch(`/address/${id}/default`);
  return data.data;
};