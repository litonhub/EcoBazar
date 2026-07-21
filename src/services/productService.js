import api from "../api/api";

export const getProducts = async (search = "") => {
  const { data } = await api.get("/products", {
    params: {
      q: search,
      limit: 100,
    },
  });

  return data.data.products;
};

export const getSearchSuggestions = async (keyword) => {
  if (!keyword) return [];
  const { data } = await api.get(`/products/search/suggestions`, {
    params: {
      q: keyword,
      limit: 6,
    },
  });
  return data.data; 
};