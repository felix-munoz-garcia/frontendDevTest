import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Aquí irá el Header más adelante */}
        <main>
          <Routes>
            {/* Ruta para el listado de productos */}
            <Route path="/" element={<ProductListPage />} />
            
            {/* Ruta para el detalle, usando un ID dinámico */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;