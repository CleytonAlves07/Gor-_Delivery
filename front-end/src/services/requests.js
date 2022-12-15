import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getDataProducts = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const createSales = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getAllSellers = async (token) => {
  const data = await api.get('/sellers', { headers: { Authorization: token } });
  return data.data;
};

export const getOrdersUserById = async (token) => {
  const data = await api.get('/sales/customer', { headers: { Authorization: token } });
  return data;
};

export const getOrdersSellerById = async (token) => {
  const data = await api.get('/sales/seller', { headers: { Authorization: token } });
  return data;
};

export const getOrderSellerDetails = async (token) => {
  const data = await api.get('/sales/seller', { headers: { Authorization: token } });
  return data;
};

export default api;
