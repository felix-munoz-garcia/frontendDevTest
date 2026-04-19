import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter(p => 
    p.brand.toLowerCase().includes(search.toLowerCase()) || 
    p.model.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2 className={styles.loading}>Cargando catálogo...</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h2 className={styles.title}>
          Catálogo <span className={styles.count}>({filteredProducts.length})</span>
        </h2>

        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar marca o modelo..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((p) => (
          <Link 
            key={p.id} 
            to={`/product/${p.id}`} 
            className={styles.productLink}
          >
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img 
                  src={p.imgUrl} 
                  alt={p.model} 
                  className={styles.image}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
                />
              </div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                {p.brand}
              </h3>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.95rem' }}>
                {p.model}
              </p>
              <p className={styles.price}>
                {p.price ? `${p.price}€` : 'Consultar'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>No se encontraron terminales que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;