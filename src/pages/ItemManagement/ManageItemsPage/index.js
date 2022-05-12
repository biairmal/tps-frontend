import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import itemsAPI from 'api/itemsAPI';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import Loader from 'components/Loader/Loader';
import Pagination from 'components/Table/Pagination';
import PageSize from 'components/Table/PageSize';
import { SnackbarContext } from 'context/SnackbarContext';
import ItemTable from './ItemTable';

function ManageItemPage() {
  const snackbarRef = useContext(SnackbarContext);

  const [pageData, setPageData] = useState({
    isLoading: false,
    rowData: [],
    totalPages: 0,
    totalRows: 0,
    hasNext: false,
    hasPrev: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  const deleteItem = async () => {
    const res = await itemsAPI.deleteItemById(selectedItem);
    closeModal();
    if (res.status === 200) {
      fetchData();
      snackbarRef.current.success('Berhasil menghapus barang!');
    } else {
      console.log('error');
    }
  };

  const fetchData = async () => {
    const res = await itemsAPI.getItems({ page: currentPage, limit: pageSize });
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
      <h1 className="text-5xl text-sky-500 font-medium">Manajemen Barang</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Daftar Barang</h2>
        <div className="max-w-7xl">
          <Link to="/items/create" className="w-min">
            <button className="border-2 border-sky-500 text-sky-500 text-sm py-2 px-4 font-semibold rounded-md w-max">
              Tambahkan Barang +
            </button>
          </Link>

          {pageData.isLoading ? (
            <Loader />
          ) : (
            <div className="mt-6">
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              <ItemTable
                data={pageData.rowData}
                isLoading={pageData.isLoading}
                openModal={openModal}
                setSelected={setSelectedItem}
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
            title="Hapus Barang?"
            description="Apakah anda yakin ingin menghapus barang ini? Penghapusan tidak dapat dibatalkan setelah dilakukan."
            proceed="Hapus"
            cancel="Batalkan"
            handler={deleteItem}
          />
        </div>
      </div>
    </>
  );
}

export default ManageItemPage;
