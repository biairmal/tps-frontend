import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext } from 'context/UserContext';
import ProtectedOutlet from 'components/Navigation/ProtectedOutlet';
import { InformasiPenjualan, LoginPage, PageBase, ManageUserPage, CreateUserPage } from './pages';
import { useLocalStorage } from 'hooks/useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user');
  const userProviderValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userProviderValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <PageBase>
                <ProtectedOutlet />
              </PageBase>
            }
          >
            <Route path="/" element={<InformasiPenjualan />} />
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
    </UserContext.Provider>
  );
}

export default App;
