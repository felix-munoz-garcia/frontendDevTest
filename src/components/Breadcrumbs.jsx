import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span className={styles.separator}>›</span>
            {isLast ? (
              <span className={styles.current}>{name === 'product' ? 'Detalle' : name}</span>
            ) : (
              <Link to={routeTo} className={styles.link}>
                {name === 'product' ? 'Producto' : name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;