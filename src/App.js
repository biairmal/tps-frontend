import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { InformasiPenjualan, LoginPage, PageBase, ManageUserPage, CreateUserPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          element={
            <PageBase>
              <Outlet />
            </PageBase>
          }
        >
          <Route path="/dashboard" element={<InformasiPenjualan />} />
          <Route path="/transactions" element={<InformasiPenjualan />} />
          <Route path="/stocks" element={<InformasiPenjualan />} />
          <Route path="/users" element={<ManageUserPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/invoices" element={<InformasiPenjualan />} />
          <Route path="/transactions/history" element={<InformasiPenjualan />} />
          <Route path="/report" element={<InformasiPenjualan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
