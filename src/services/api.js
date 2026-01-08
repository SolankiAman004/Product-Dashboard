import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await API.get('/products');
    return response.data;
  },

  // Add new product
  addProduct: async (product) => {
    const response = await API.post('/products', product);
    return response.data;
  },

  // Update product
  updateProduct: async (id, product) => {
    const response = await API.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await API.get('/products/categories');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await API.get(`/products/category/${category}`);
    return response.data;
  }
};