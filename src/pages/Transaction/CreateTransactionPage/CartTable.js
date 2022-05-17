import PropTypes from 'prop-types';
import Table from 'components/Table/Table';
import { DeleteCell, ImageCell, PriceCell } from 'components/Table/Cells';

function CartTable({ data, deleteFunction }) {
  const columns = [
    { Header: 'Kode', accessor: 'code' },
    { Header: 'Nama Barang', accessor: 'name' },
    { Header: 'Picture', Cell: (props) => <ImageCell {...props} /> },
    { Header: 'Harga', Cell: (props) => <PriceCell {...props} columnName="normalPrice" /> },
    { Header: 'Qty', accessor: 'quantity' },
    { Header: 'Total', Cell: (props) => <PriceCell {...props} columnName="normalPrice" /> },
    {
      Header: ' ',
      Cell: (props) => <DeleteCell {...props} handleDelete={deleteFunction} />
    }
  ];

  return <Table columns={columns} data={data} />;
}

CartTable.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  setSelected: PropTypes.func,
  deleteFunction: PropTypes.func
};

export default CartTable;
