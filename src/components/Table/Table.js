/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { useTable } from 'react-table';

function Table({ columns, data }) {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  if (data.length < 1) return <div className="mt-4 py-12 w-full text-center">Tidak ada data</div>;

  return (
    <table
      {...getTableProps()}
      className="text-sm overflow-hidden w-full border-separate rounded-lg shadow"
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
            <tr
              key={row.id}
              {...row.getRowProps()}
              className="tr bg-white odd:bg-gray-50 text-center"
            >
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
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default React.memo(Table);
