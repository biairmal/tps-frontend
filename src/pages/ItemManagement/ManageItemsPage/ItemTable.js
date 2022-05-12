import PropTypes from 'prop-types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Table from 'components/Table/Table';
import { useNavigate } from 'react-router-dom';

function ItemTable({ data, isLoading, openModal, setSelected }) {
  const columns = [
    { Header: 'Kode', accessor: 'code' },
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Foto', Cell: (props) => <ItemImage {...props} /> },
    { Header: 'Deskripsi', accessor: 'description' },
    { Header: 'Jumlah', accessor: 'quantity' },
    { Header: 'COGS', accessor: 'cogs' },
    { Header: 'Harga Normal', accessor: 'normalPrice' },
    { Header: 'Harga Dealer', accessor: 'dealerPrice' },
    { Header: 'Discount', accessor: 'discount' },
    { Header: 'Pajak', accessor: 'tax' },
    {
      Header: ' ',
      Cell: (props) => <ActionColumn {...props} openModal={openModal} setSelected={setSelected} />
    }
  ];

  return <Table columns={columns} data={data} isLoading={isLoading} />;
}

ItemTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func,
  setSelected: PropTypes.func
};

const ItemImage = ({ row }) => {
  if (row.original.picture) {
    return (
      <div className="w-40 h-24 rounded-md">
        <img alt="Item" className="object-contain w-full h-full" src={row.original.picture} />
      </div>
    );
  }
  return <div className="w-40 h-24 rounded-md bg-gray-200"></div>;
};

ItemImage.propTypes = {
  row: PropTypes.object
};

const ActionColumn = ({ row, openModal, setSelected }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4 justify-center">
      <div>
        <button
          className="text-gray-700"
          title="Edit"
          onClick={() => {
            navigate(`/items/${row.original.id}/edit`);
          }}
        >
          <PencilAltIcon className="w-4 h-4" />
        </button>
      </div>
      <div>
        <button
          className="text-red-500"
          onClick={() => {
            setSelected(row.original.id);
            openModal();
          }}
          title="Delete"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

ActionColumn.propTypes = {
  row: PropTypes.object,
  openModal: PropTypes.func,
  setSelected: PropTypes.func
};

export default ItemTable;
