import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SearchIcon
} from '@heroicons/react/solid';

function Table({ columns, data }) {
  const tableInstance = useTable({ columns, data }, useGlobalFilter, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, globalFilter },
    pageCount,
    setGlobalFilter,
    setPageSize,
    pageSize
  } = tableInstance;

  const inputGotoPage = React.useCallback(
    (e) => {
      const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
      gotoPage(pageNumber);
    },
    [gotoPage]
  );

  const inputPageSize = React.useCallback(
    (e) => setPageSize(Number(e.target.value)),
    [setPageSize]
  );

  const inputGlobalFilter = React.useCallback(
    (e) => setGlobalFilter(e.target.value),
    [setGlobalFilter]
  );

  const tableSize = React.useMemo(
    () => (
      <div className="select-none">
        <span className="">
          Show
          <select
            className="mx-1 rounded-md p-1 focus:outline-none shadow"
            value={pageSize}
            onChange={inputPageSize}
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          Entries
        </span>
      </div>
    ),
    []
  );

  const pagination = React.useMemo(
    () =>
      pageOptions.length > 1 && (
        <div className="flex justify-between px-6 py-4">
          <div>
            Page{' '}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                gotoPage(0);
              }}
              disabled={!canPreviousPage}
              className="bg-sky-600 p-1 rounded-l"
            >
              <ChevronDoubleLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="bg-sky-600 p-1"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <input
              type="number"
              className="w-10 border-2 border-green-600 text-center text-lg pl-3"
              value={pageIndex + 1}
              onChange={inputGotoPage}
            />
            <button
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="bg-sky-600 p-1"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
            <button
              type="button"
              onClick={() => {
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
              className="bg-sky-600 p-1 rounded-r"
            >
              <ChevronDoubleRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )
  );

  return (
    <div>
      {/* <div className="flex justify-between items-center p-2">
        {tableSize}
        <div className="w-96 shadow-md flex rounded-xl bg-white p-1 select-none">
          <input
            className="w-full h-full  p-2 focus:outline-none"
            placeholder="Cari"
            value={globalFilter || ''}
            onChange={inputGlobalFilter}
          />
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
      </div> */}

      <div className="mt-4">
        <table
          {...getTableProps()}
          className="overflow-hidden w-full border-separate rounded-lg shadow"
        >
          <thead className="bg-sky-500 text-white">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="py-2 first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="tr bg-white">
                  {row.cells.map((cell, index) => (
                    <td key={index} className="py-2 px-8 ">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {pagination}
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default React.memo(Table);
