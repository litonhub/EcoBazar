import api from "./api";

// Create new category
export const createCategory = (formData) => {
  return api.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get all categories
export const getCategories = (params = {}) => {
  return api.get("/categories", { params });
};