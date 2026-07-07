import api from "./api";

export const createProduct = (formData) => {
  return api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProducts = (params = {}) => {
  return api.get("/products", {
    params,
  });
};

export const getSingleProduct = (slug) => {
  return api.get(`/products/${slug}`);
};

export const getProductById = (id) => {
    return api.get(`/products/id/${id}`);
};

export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};