import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'black' }}>
        Mi Tienda de Móviles
      </Link>
      <div>
        🛒 Carrito: 0
      </div>
    </header>
  );
};

export default Header;