import PropTypes from 'prop-types';
import Table from 'components/Table/Table';
import { DeleteCell, ImageCell, PriceCell } from 'components/Table/Cells';

function CartTable({ data, customerType, deleteFunction }) {
  const columns = [
    { Header: 'Kode', accessor: 'code' },
    { Header: 'Nama Barang', accessor: 'name' },
    { Header: 'Picture', Cell: (props) => <ImageCell {...props} /> },
    { Header: 'Harga', Cell: (props) => <PriceCell {...props} columnName="price" /> },
    { Header: 'Qty', accessor: 'quantity' },
    {
      Header: 'Total',
      Cell: (props) => <PriceCell {...props} columnName="totalPrice" type="function" />
    },
    {
      Header: ' ',
      Cell: (props) => <DeleteCell {...props} handleDelete={deleteFunction} />
    }
  ];

  const formatedData = data.map((row) => ({
    code: row.item.code,
    name: row.item.name,
    picture: row.item.picture,
    price: customerType === 'dealer' ? row.item.dealerPrice : row.item.normalPrice,
    quantity: row.quantity,
    totalPrice: function () {
      return this.price * this.quantity;
    }
  }));

  return <Table columns={columns} data={formatedData} />;
}

CartTable.propTypes = {
  customerType: PropTypes.string,
  data: PropTypes.array,
  openModal: PropTypes.func,
  setSelected: PropTypes.func,
  deleteFunction: PropTypes.func
};

export default CartTable;
