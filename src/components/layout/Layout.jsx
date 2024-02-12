import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import css from '../../components/layout/css/layout.module.css';
import helloPhoto from '../../img/jpg/helloEvano.jpg';

const Layout = () => {
  return (
    <div className={css.layoutPage}>
      <div className={css.layoutPage__sidebar}>
        <Sidebar />
      </div>
      <div className={css.layoutPage__container}>
        <header className={css.layoutPage__container__header}>
          <img src={helloPhoto} alt="hello" width={176} height={36} />
        </header>

        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default Layout;
