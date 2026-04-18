const API_URL = 'https://itx-frontend-test.onrender.com/api'; 

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/product`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};