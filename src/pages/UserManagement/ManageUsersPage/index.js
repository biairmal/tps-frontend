import { useState, useEffect, useContext } from 'react';
import usersAPI from 'api/usersAPI';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import LinkButton from 'components/Navigation/LinkButton';
import Loader from 'components/Loader/Loader';
import PageSize from 'components/Table/PageSize';
import Pagination from 'components/Table/Pagination';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { usePagination } from 'hooks';
import UserTable from './UserTable';

function ManageUserPage() {
  const defaultPageDataValue = {
    isLoading: false,
    rowData: []
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageData, setPageData] = useState(defaultPageDataValue);
  const { currentPage, setCurrentPage, pageSize, setPageSize, navigation, setNavigation } =
    usePagination();
  const snackbarRef = useContext(SnackbarContext);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const fetchData = async () => {
    const res = await usersAPI.getUsers({ page: currentPage, limit: pageSize });
    setPageData({
      isLoading: false,
      rowData: res.data.data.edge,
      size: res.data.data.cursor.size
    });
    setNavigation({
      hasNext: res.data.data.cursor.hasNext,
      hasPrev: res.data.data.cursor.hasPrev,
      totalPages: res.data.data.cursor.totalPages,
      totalRows: res.data.data.cursor.totalRows
    });
  };

  const deleteUser = async () => {
    const res = await usersAPI.deleteUserById(selectedUser);
    closeModal();
    if (res.status === 200) {
      fetchData();
      snackbarRef.current.success('Berhasil menghapus pengguna!');
    } else {
      snackbarRef.current.error('Terjadi kesalahan!');
    }
  };

  useEffect(() => {
    setPageData({
      isLoading: true,
      rowData: []
    });
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Akun dan Pengguna</Heading>
      <SubHeading>Daftar Pengguna</SubHeading>
      <LinkButton to="/users/create">Tambahkan Pengguna +</LinkButton>

      {pageData.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col space-y-4">
          <PageSize
            pageSize={pageSize}
            setPageSize={setPageSize}
            show={pageData.rowData.length > 0}
          />
          <UserTable data={pageData.rowData} openModal={openModal} setSelected={setSelectedUser} />
          <Pagination
            currentPage={currentPage}
            hasNext={navigation.hasNext}
            hasPrev={navigation.hasPrev}
            setCurrentPage={setCurrentPage}
            totalPages={navigation.totalPages}
            show={pageData.rowData.length > 0}
          />
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
      )}
    </div>
  );
}

export default ManageUserPage;
