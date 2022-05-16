import { useState, useEffect } from 'react';
import transactionsAPI from 'api/transactionsAPI';
import Loader from 'components/Loader/Loader';
import PageSize from 'components/Table/PageSize';
import Pagination from 'components/Table/Pagination';
import { Heading, SubHeading } from 'components/Text';
import { usePagination } from 'hooks';
import TransactionTable from './TransactionTable';

function TransactionPage() {
  const defaultPageDataValue = {
    isLoading: false,
    rowData: []
  };
  const [pageData, setPageData] = useState(defaultPageDataValue);
  const { currentPage, setCurrentPage, pageSize, setPageSize, navigation, setNavigation } =
    usePagination();

  const fetchData = async () => {
    const res = await transactionsAPI.getUsers({ page: currentPage, limit: pageSize });
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

  useEffect(() => {
    setPageData({
      isLoading: true,
      rowData: []
    });
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Panel Transaksi</Heading>
      <SubHeading>Riwayat Transaksi</SubHeading>

      {pageData.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col space-y-4">
          <PageSize pageSize={pageSize} setPageSize={setPageSize} />
          <TransactionTable data={pageData.rowData} />
          <Pagination
            currentPage={currentPage}
            hasNext={navigation.hasNext}
            hasPrev={navigation.hasPrev}
            setCurrentPage={setCurrentPage}
            totalPages={navigation.totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default TransactionPage;
