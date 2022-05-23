import { useMemo, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext } from 'context/UserContext';
import ProtectedOutlet from 'components/Navigation/ProtectedOutlet';
import {
  InformasiPenjualan,
  LaporanPenjualan,
  LoginPage,
  PageBase,
  CreateUserPage,
  EditUserPage,
  EditProfilePage,
  ManageUsersPage,
  CreateItemPage,
  EditItemPage,
  ManageItemsPage,
  CreateTransactionPage,
  TransactionPage
} from './pages';
import { useLocalStorage } from 'hooks/useLocalStorage';
import Snackbar from 'components/Notification/Snackbar';
import { SnackbarContext } from 'context/SnackbarContext';

function App() {
  const [user, setUser] = useLocalStorage('user');
  const userProviderValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  const snackbarRef = useRef(null);

  return (
    <UserContext.Provider value={userProviderValue}>
      <Snackbar ref={snackbarRef} />
      <SnackbarContext.Provider value={snackbarRef}>
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
              <Route path="/report" element={<LaporanPenjualan />} />
              {/* Transaction */}
              <Route path="/transactions/create" element={<CreateTransactionPage />} />
              <Route path="/transactions/history" element={<TransactionPage />} />
              {/* Item Management */}
              <Route path="/items" element={<ManageItemsPage />} />
              <Route path="/items/create" element={<CreateItemPage />} />
              <Route path="/items/:id/edit" element={<EditItemPage />} />
              {/* User Management */}
              <Route path="/users" element={<ManageUsersPage />} />
              <Route path="/users/create" element={<CreateUserPage />} />
              <Route path="/users/:id/edit" element={<EditUserPage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/report" element={<InformasiPenjualan />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
