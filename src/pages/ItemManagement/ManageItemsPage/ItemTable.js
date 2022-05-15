import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Table from 'components/Table/Table';
import { ActionCell, DescriptionCell, ImageCell, PriceCell } from 'components/Table/Cells';

function ItemTable({ data, openModal, setSelected }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/items/${id}/edit`);
  };

  const handleDelete = (id) => {
    setSelected(id);
    openModal();
  };

  const columns = [
    { Header: 'Kode', accessor: 'code' },
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Foto', Cell: (props) => <ImageCell {...props} /> },
    { Header: 'Deskripsi', Cell: (props) => <DescriptionCell {...props} /> },
    { Header: 'Jumlah', accessor: 'quantity' },
    { Header: 'COGS', Cell: (props) => <PriceCell {...props} columnName="cogs" /> },
    { Header: 'Harga Normal', Cell: (props) => <PriceCell {...props} columnName="normalPrice" /> },
    { Header: 'Harga Dealer', Cell: (props) => <PriceCell {...props} columnName="dealerPrice" /> },
    { Header: 'Discount', accessor: 'discount' },
    { Header: 'Pajak', accessor: 'tax' },
    {
      Header: ' ',
      Cell: (props) => <ActionCell {...props} handleEdit={handleEdit} handleDelete={handleDelete} />
    }
  ];

  return <Table columns={columns} data={data} />;
}

ItemTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func,
  setSelected: PropTypes.func
};

export default ItemTable;
