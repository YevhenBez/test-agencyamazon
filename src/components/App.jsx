import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import { lazy } from 'react';
const Accounts = lazy(() => import('../pages/accounts'));
const Profiles = lazy(() => import('../pages/accounts/profiles'));
const OtherPages = lazy(() => import('../pages/otherPages'));

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accounts />} />
          <Route path="profiles/:accountId" element={<Profiles />} />
          <Route path="other" element={<OtherPages />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
