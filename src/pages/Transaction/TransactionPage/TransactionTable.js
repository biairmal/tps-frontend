import PropTypes from 'prop-types';
import Table from 'components/Table/Table';

function TransactionTable({ data }) {
  const columns = [
    { Header: 'Total Produk', accessor: 'totalProducts' },
    { Header: 'Total Qty', accessor: 'totalQuantity' },
    { Header: 'Subtotal', accessor: 'subtotalPrice' },
    { Header: 'Total', accessor: 'totalPrice' },
    { Header: 'Notes', accessor: 'notes' },
    { Header: 'Invoices', accessor: 'invoice' }
  ];

  return <Table columns={columns} data={data} />;
}

TransactionTable.propTypes = {
  data: PropTypes.array
};

export default TransactionTable;
