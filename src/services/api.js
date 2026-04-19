const API_URL = 'https://itx-frontend-test.onrender.com/api';
const CACHE_EXPIRATION = 60 * 60 * 1000;

const getFromCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const saveToCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getProducts = async () => {
  const cachedData = getFromCache('products_list');
  if (cachedData) return cachedData;

  try {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    saveToCache('products_list', data);
    return data;
  } catch {
    return [];
  }
};

export const getProductById = async (id) => {
  const cacheKey = `product_${id}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch {
    return null;
  }
};

export const addToCart = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Error al añadir al carrito');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};