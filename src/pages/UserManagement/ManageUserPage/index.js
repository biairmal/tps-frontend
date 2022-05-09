import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import usersAPI from 'api/usersAPI';
import UsersTable from './UsersTable';
import Pagination from 'components/Table/Pagination';
import PageSize from 'components/Table/PageSize';

function ManageUserPage() {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0,
    hasNext: false,
    hasPrev: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true
    }));

    usersAPI.getUsers({ page: currentPage, limit: pageSize }).then((res) => {
      console.log(res);
      setPageData({
        isLoading: false,
        rowData: res.data.data.edge,
        totalPages: res.data.data.cursor.totalPages,
        totalRows: res.data.data.cursor.totalRows,
        hasNext: res.data.data.cursor.hasNext,
        hasPrev: res.data.data.cursor.hasPrev,
        size: res.data.data.cursor.size
      });
    });
  }, [currentPage, pageSize]);

  return (
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Akun dan Pengguna</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Daftar Pengguna</h2>
        <div className="max-w-7xl">
          <Link to="/users/create" className="w-min">
            <button className="text-sky-500 underline font-semibold rounded-md w-max">
              Tambahkan Pengguna +
            </button>
          </Link>
          {pageData.isLoading ? (
            <div className="w-full mt-12 mx-auto flex justify-center">
              <PulseLoader color={'gray'} size={15} />
            </div>
          ) : (
            <>
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              <UsersTable data={pageData.rowData} isLoading={pageData.isLoading} />
              <Pagination
                currentPage={currentPage}
                hasNext={pageData.hasNext}
                hasPrev={pageData.hasPrev}
                setCurrentPage={setCurrentPage}
                totalPages={pageData.totalPages}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageUserPage;
