import { useState, useEffect, useContext } from 'react';
import itemsAPI from 'api/itemsAPI';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import LinkButton from 'components/Navigation/LinkButton';
import Loader from 'components/Loader/Loader';
import PageSize from 'components/Table/PageSize';
import Pagination from 'components/Table/Pagination';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { usePagination } from 'hooks';
import ItemTable from './ItemTable';

function ManageItemPage() {
  const defaultPageDataValue = {
    isLoading: false,
    rowData: []
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageData, setPageData] = useState(defaultPageDataValue);
  const { currentPage, setCurrentPage, pageSize, setPageSize, navigation, setNavigation } =
    usePagination();
  const snackbarRef = useContext(SnackbarContext);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  const fetchData = async () => {
    const res = await itemsAPI.getItems({ page: currentPage, limit: pageSize });
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

  const deleteItem = async () => {
    const res = await itemsAPI.deleteItemById(selectedItem);
    closeModal();
    if (res.status === 200) {
      fetchData();
      snackbarRef.current.success('Berhasil menghapus barang!');
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
      <Heading>Manajemen Barang</Heading>
      <SubHeading>Daftar Barang</SubHeading>
      <LinkButton to="/items/create">Tambahkan Barang +</LinkButton>

      {pageData.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col space-y-4">
          <PageSize
            pageSize={pageSize}
            setPageSize={setPageSize}
            show={pageData.rowData.length > 0}
          />
          <ItemTable
            data={pageData.rowData}
            isLoading={pageData.isLoading}
            openModal={openModal}
            setSelected={setSelectedItem}
          />
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
            title="Hapus Barang?"
            description="Apakah anda yakin ingin menghapus barang ini? Penghapusan tidak dapat dibatalkan setelah dilakukan."
            proceed="Hapus"
            cancel="Batalkan"
            handler={deleteItem}
          />
        </div>
      )}
    </div>
  );
}

export default ManageItemPage;
