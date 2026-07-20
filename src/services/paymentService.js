import api from "../api/api";

export const initPayment = async (
  orderId
) => {
  const { data } = await api.post(
    "/payments/init",
    {
      orderId,
    }
  );

  return data;
};