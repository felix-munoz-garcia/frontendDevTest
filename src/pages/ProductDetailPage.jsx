import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api'; // Añadido addToCart aquí

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      if (data?.options?.colors?.length > 0) setSelectedColor(data.options.colors[0].code);
      if (data?.options?.storages?.length > 0) setSelectedStorage(data.options.storages[0].code);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const selection = {
      id: product.id,
      colorCode: parseInt(selectedColor),
      storageCode: parseInt(selectedStorage)
    };

    const result = await addToCart(selection);
    
    if (result) {
      alert(`¡Añadido! El carrito ahora tiene ${result.count} productos`);
    }
  };

  if (loading) return <h2>Cargando detalle...</h2>;
  if (!product) return <h2>Producto no encontrado</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Volver al listado</Link>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
          <img src={product.imgUrl} alt={product.model} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h1>{product.brand} {product.model}</h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{product.price}€</p>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Configuración</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label><strong>Color: </strong></label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {product.options.colors.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label><strong>Capacidad: </strong></label>
              <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
                {product.options.storages.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Añadir al carrito
            </button>
          </div>

          <hr />
          <h3>Especificaciones</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram}</li>
            <li><strong>SO:</strong> {product.os}</li>
            <li><strong>Pantalla:</strong> {product.displayResolution}</li>
            <li><strong>Batería:</strong> {product.battery}</li>
            <li><strong>Cámaras:</strong> {product.primaryCamera}</li>
            <li><strong>Dimensiones:</strong> {product.dimentions}</li>
            <li><strong>Peso:</strong> {product.weight}g</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;