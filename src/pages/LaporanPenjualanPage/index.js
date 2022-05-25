import { useState, useEffect } from 'react';
import reportsAPI from 'api/reportsAPI';
import Loader from 'components/Loader/Loader';
import PageSize from 'components/Table/PageSize';
import Pagination from 'components/Table/Pagination';
import { Heading, SubHeading } from 'components/Text';
import { usePagination } from 'hooks';
import ReportTable from './ReportTable';

function LaporanPenjualan() {
  const defaultPageDataValue = {
    isLoading: false,
    rowData: []
  };

  const [groupBy, setGroupBy] = useState('day');

  const buttons = [
    { label: 'Harian', value: 'day' },
    { label: 'Bulanan', value: 'month' },
    { label: 'Tahunan', value: 'year' }
  ];

  const [pageData, setPageData] = useState(defaultPageDataValue);
  const { currentPage, setCurrentPage, pageSize, setPageSize, navigation, setNavigation } =
    usePagination();

  const fetchData = async () => {
    const res = await reportsAPI.getReports({
      page: currentPage,
      limit: pageSize,
      groupBy: groupBy
    });
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
  }, [currentPage, pageSize, groupBy]);

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Laporan Penjualan</Heading>
      <SubHeading>Rekap Penjualan</SubHeading>

      {pageData.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="space-x-2">
            {buttons.map(({ label, value }) => (
              <button
                className={`border-2 border-sky-500 w-min px-2 py-1 text-sm rounded-md font-semibold
                ${value === groupBy ? 'bg-sky-500 text-white' : 'text-sky-400 bg-transparent'}`}
                key={label}
                onClick={() => setGroupBy(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <PageSize
              pageSize={pageSize}
              setPageSize={setPageSize}
              show={pageData.rowData.length > 0}
            />
            <ReportTable data={pageData.rowData} groupBy={groupBy} />
            <Pagination
              currentPage={currentPage}
              hasNext={navigation.hasNext}
              hasPrev={navigation.hasPrev}
              setCurrentPage={setCurrentPage}
              totalPages={navigation.totalPages}
              show={pageData.rowData.length > 0}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LaporanPenjualan;
