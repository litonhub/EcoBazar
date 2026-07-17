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