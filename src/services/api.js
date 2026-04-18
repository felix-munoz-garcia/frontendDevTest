const API_URL = 'https://itx-frontend-test.onrender.com/api';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) throw new Error('Error');
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) throw new Error('Error');
    return await response.json();
  } catch (error) {
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
    return await response.json(); // La API devuelve { count: X }
  } catch (error) {
    console.error(error);
    return null;
  }
};