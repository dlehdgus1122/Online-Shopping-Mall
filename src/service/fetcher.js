import axios from "axios";

const apiUrl = "/data/products.json";

export const getProducts = () => {
  const res = axios.get(apiUrl);
  return res;
};
