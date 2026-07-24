import api from "./api";

export const createCategory = (formData) => {
  return api.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCategories = (params = {}) => {
  return api.get("/categories", { params });
};

export const getAllCategories = (params = {}) => {
  return api.get("/categories", { params });
};

export const getSingleCategory = (slug) => {
  return api.get(`/categories/${slug}`);
};

export const updateCategory = (id, formData) => {
  return api.put(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};