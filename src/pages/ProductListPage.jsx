import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

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

  if (loading) return <h2>Cargando...</h2>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Catálogo ({filteredProducts.length})</h2>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <img src={p.imgUrl} alt={p.model} style={{ height: '120px', objectFit: 'contain' }} />
              <h3>{p.brand}</h3>
              <p>{p.model}</p>
              <p><strong>{p.price ? `${p.price}€` : 'N/A'}</strong></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;