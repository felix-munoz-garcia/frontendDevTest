import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import styles from './App.module.css';

function App() {
  // 2. Modificamos el estado inicial para que lea de LocalStorage
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem('cart_count');
    return savedCart ? parseInt(savedCart) : 0;
  });

  // 3. Función mejorada para sumar y guardar
  const updateCart = (countFromServer) => {
    setCartCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('cart_count', newCount); // Guardamos en el navegador
      return newCount;
    });
  };
  
  const resetCart = () => {
    setCartCount(0);
    localStorage.removeItem('cart_count');
  };

  return (
    <Router>
      {/* Pasamos el número al Header */}
      <Header cartCount={cartCount} onResetCart={resetCart} />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          {/* Pasamos la función de actualizar a la página de detalle */}
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