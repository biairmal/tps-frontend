import PropTypes from 'prop-types';
import Table from 'components/Table/Table';
import { PriceCell } from 'components/Table/Cells';
import InvoiceButton from './InvoiceButton';

function TransactionTable({ data }) {
  const columns = [
    { Header: 'Total Produk', accessor: 'totalProducts' },
    { Header: 'Total Qty', accessor: 'totalQuantity' },
    { Header: 'Subtotal', Cell: (props) => <PriceCell {...props} columnName="subtotalPrice" /> },
    { Header: 'Total', Cell: (props) => <PriceCell {...props} columnName="totalPrice" /> },
    {
      Header: 'Invoices',
      Cell: (props) => <InvoiceButton {...props} />
    }
  ];

  return <Table columns={columns} data={data} />;
}

TransactionTable.propTypes = {
  data: PropTypes.array
};

export default TransactionTable;
