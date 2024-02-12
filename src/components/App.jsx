import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import { lazy } from 'react';
const Customers = lazy(() => import('../pages/customers'));
const OtherPages = lazy(() => import('../pages/otherPages'));

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Customers />} />
          <Route path="other" element={<OtherPages />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
