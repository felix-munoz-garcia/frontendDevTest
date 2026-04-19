import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';
import styles from './ProductDetailPage.module.css';

// Añadimos 'onAddToCart' como prop para comunicar con App.jsx
const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      // Selección por defecto de las primeras opciones disponibles
      if (data?.options?.colors?.length > 0) setSelectedColor(data.options.colors[0].code);
      if (data?.options?.storages?.length > 0) setSelectedStorage(data.options.storages[0].code);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    // Preparamos el objeto según requiere la API (códigos como números)
    const selection = {
      id: product.id,
      colorCode: parseInt(selectedColor),
      storageCode: parseInt(selectedStorage)
    };

    const result = await addToCart(selection);
    
    if (result) {
      // LLAMADA CLAVE: Avisamos al componente padre (App.jsx) del nuevo conteo
      onAddToCart(result.count); 
      alert(`¡Producto añadido con éxito!`);
    } else {
      alert("Hubo un error al añadir al carrito.");
    }
  };

  if (loading) return <h2 className={styles.loading}>Cargando detalles del producto...</h2>;
  if (!product) return <h2 className={styles.error}>Producto no encontrado</h2>;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Volver al listado
      </Link>
      
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img 
            src={product.imgUrl} 
            alt={product.model} 
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.brand} {product.model}</h1>
          <p className={styles.price}>
            {product.price ? `${product.price}€` : 'Consultar precio'}
          </p>
          
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Personaliza tu compra</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}><strong>Color:</strong></label>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className={styles.select}
              >
                {product.options.colors.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}><strong>Almacenamiento:</strong></label>
              <select 
                value={selectedStorage} 
                onChange={(e) => setSelectedStorage(e.target.value)}
                className={styles.select}
              >
                {product.options.storages.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            <button onClick={handleAddToCart} className={styles.addButton}>
              Añadir al carrito
            </button>
          </div>

          <hr className={styles.divider} />
          
          <h3>Especificaciones Técnicas</h3>
          <ul className={styles.specsList}>
            <li><strong>CPU:</strong> {product.cpu || 'N/A'}</li>
            <li><strong>RAM:</strong> {product.ram || 'N/A'}</li>
            <li><strong>Sistema Operativo:</strong> {product.os || 'N/A'}</li>
            <li><strong>Resolución de pantalla:</strong> {product.displayResolution || 'N/A'}</li>
            <li><strong>Batería:</strong> {product.battery || 'N/A'}</li>
            <li><strong>Cámara Principal:</strong> {product.primaryCamera || 'N/A'}</li>
            <li><strong>Dimensiones:</strong> {product.dimentions || 'N/A'}</li>
            <li><strong>Peso:</strong> {product.weight ? `${product.weight}g` : 'N/A'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;