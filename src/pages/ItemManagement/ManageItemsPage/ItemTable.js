import PropTypes from 'prop-types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Table from 'components/Table/Table';
import { useNavigate } from 'react-router-dom';

function ItemTable({ data, isLoading, openModal, setSelected }) {
  const columns = [
    { Header: 'Kode', accessor: 'code' },
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Foto', Cell: (props) => <ItemImage {...props} /> },
    { Header: 'Deskripsi', Cell: (props) => <Description {...props} /> },
    { Header: 'Jumlah', accessor: 'quantity' },
    { Header: 'COGS', Cell: (props) => <ItemPrice {...props} columnName="cogs" /> },
    { Header: 'Harga Normal', Cell: (props) => <ItemPrice {...props} columnName="normalPrice" /> },
    { Header: 'Harga Dealer', Cell: (props) => <ItemPrice {...props} columnName="dealerPrice" /> },
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

const ItemPrice = ({ row, columnName }) => {
  const priceArr = row.original[columnName].toString();
  const split = priceArr.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return <div className="whitespace-nowrap">Rp. {rupiah},-</div>;
};

ItemPrice.propTypes = {
  columnName: PropTypes.string,
  prefix: PropTypes.string,
  row: PropTypes.object
};

const ItemImage = ({ row }) => {
  if (row.original.picture) {
    return (
      <div className="aspect-video w-32 my-2 rounded-md overflow-hidden">
        <img alt="Item" className="object-contain w-full h-full" src={row.original.picture} />
      </div>
    );
  }
  return <div className="w-40 h-24 rounded-md bg-gray-200"></div>;
};

ItemImage.propTypes = {
  row: PropTypes.object
};

const Description = ({ row }) => {
  return <p>{row.original.description}</p>;
};

Description.propTypes = {
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
