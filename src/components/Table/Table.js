/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SearchIcon
} from '@heroicons/react/solid';

function Table({ columns, data, isLoading }) {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div>
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
            {rows.map((row) => {
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
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default React.memo(Table);
