import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import usersAPI from 'api/usersAPI';
import UsersTable from './UsersTable';
import Pagination from 'components/Table/Pagination';
import PageSize from 'components/Table/PageSize';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import { SnackbarContext } from 'context/SnackbarContext';

function ManageUserPage() {
  const snackbarRef = useContext(SnackbarContext);

  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0,
    hasNext: false,
    hasPrev: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async () => {
    const res = await usersAPI.deleteUserById(selectedUser);
    closeModal();
    if (res.status === 200) {
      fetchData();
      snackbarRef.current.success('Berhasil menghapus pengguna!');
    } else {
      console.log('error');
    }
  };

  const fetchData = async () => {
    const res = await usersAPI.getUsers({ page: currentPage, limit: pageSize });
    setPageData({
      isLoading: false,
      rowData: res.data.data.edge,
      totalPages: res.data.data.cursor.totalPages,
      totalRows: res.data.data.cursor.totalRows,
      hasNext: res.data.data.cursor.hasNext,
      hasPrev: res.data.data.cursor.hasPrev,
      size: res.data.data.cursor.size
    });
  };

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true
    }));

    fetchData();
  }, [currentPage, pageSize]);

  return (
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Akun dan Pengguna</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Daftar Pengguna</h2>
        <div className="max-w-7xl">
          <Link to="/users/create" className="w-min">
            <button className="border-2 border-sky-500 text-sky-500 text-sm py-2 px-4 font-semibold rounded-md w-max">
              Tambahkan Pengguna +
            </button>
          </Link>
          {pageData.isLoading ? (
            <div className="w-full mt-12 mx-auto flex justify-center">
              <PulseLoader color={'gray'} size={15} />
            </div>
          ) : (
            <div className="mt-6">
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              <UsersTable
                data={pageData.rowData}
                isLoading={pageData.isLoading}
                openModal={openModal}
                setSelected={setSelectedUser}
              />
              <Pagination
                currentPage={currentPage}
                hasNext={pageData.hasNext}
                hasPrev={pageData.hasPrev}
                setCurrentPage={setCurrentPage}
                totalPages={pageData.totalPages}
              />
            </div>
          )}
          <ConfirmationModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            title="Hapus Pengguna?"
            description="Apakah anda yakin ingin menghapus pengguna ini? Penghapusan tidak dapat dibatalkan setelah dilakukan."
            proceed="Hapus"
            cancel="Batalkan"
            handler={deleteUser}
          />
        </div>
      </div>
    </>
  );
}

export default ManageUserPage;
