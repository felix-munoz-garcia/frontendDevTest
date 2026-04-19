import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import styles from './Header.module.css';

const Header = ({ cartCount, onResetCart }) => {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logoLink}>
          <h1 className={styles.logo}>
            📱 MobileShop
          </h1>
        </Link>
        
        <div className={styles.cartContainer}>
          <div className={styles.cartInfo}>
            🛒 Carrito: <strong className={styles.cartCount}>{cartCount}</strong>
          </div>

          {cartCount > 0 && (
            <button onClick={onResetCart} className={styles.resetButton}>
              Vaciar
            </button>
          )}
        </div>
      </div>

      <div className={styles.breadcrumbsContainer}>
        <Breadcrumbs />
      </div>
    </header>
  );
};

export default Header;