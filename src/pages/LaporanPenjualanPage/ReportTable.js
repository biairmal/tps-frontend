import PropTypes from 'prop-types';
import Table from 'components/Table/Table';
import { DateCell, PriceCell } from 'components/Table/Cells';

function ReportTable({ data, groupBy }) {
  const dateHeaders = {
    day: 'Tanggal',
    month: 'Bulan',
    year: 'Tahun'
  };
  
  const columns = [
    {
      Header: dateHeaders[groupBy],
      Cell: (props) => <DateCell {...props} groupBy={groupBy} />
    },
    { Header: 'Jumlah Transaksi', accessor: 'transactions' },
    { Header: 'Produk Terjual', accessor: 'soldItems' },
    {
      Header: 'Total Pendapatan',
      Cell: (props) => <PriceCell {...props} columnName="grossProfit" />
    },
    {
      Header: 'Total Pengeluaran',
      Cell: (props) => <PriceCell {...props} columnName="totalCogs" />
    }
  ];

  return <Table columns={columns} data={data} />;
}

ReportTable.propTypes = {
  data: PropTypes.array,
  groupBy: PropTypes.string
};

export default ReportTable;
