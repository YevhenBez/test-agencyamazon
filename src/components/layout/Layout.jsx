import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import css from '../../components/layout/css/layout.module.css';

const Layout = () => {
  return (
    <div className={css.layoutPage}>
      <div className={css.layoutPage__sidebar}>
        <Sidebar />
      </div>
      <div className={css.layoutPage__container}>
        
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default Layout;
