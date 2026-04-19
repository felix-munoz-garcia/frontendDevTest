import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import styles from './App.module.css';

function App() {
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem('cart_count');
    const count = Number(savedCart);
    return (!isNaN(count) && count > 0) ? count : 0;
  });

  const updateCart = (serverCount) => {
    // Si el servidor devuelve el conteo, lo usamos. 
    // Si no (fallback), incrementamos el local.
    const countFromApi = serverCount?.count;
    const finalCount = typeof countFromApi === 'number' ? countFromApi : cartCount + 1;
    
    setCartCount(finalCount);
    localStorage.setItem('cart_count', finalCount);
  };
  
  const resetCart = () => {
    setCartCount(0);
    localStorage.removeItem('cart_count');
  };

  return (
    <Router>
      <Header cartCount={cartCount} onResetCart={resetCart} />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetailPage onAddToCart={updateCart} />} 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;