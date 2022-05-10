import PropTypes from 'prop-types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Table from 'components/Table/Table';
import roles from 'config/roles';

function UsersTable({ data, isLoading, openModal, setSelected }) {
  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Nama depan', accessor: 'firstName' },
    { Header: 'Nama belakang', accessor: 'lastName' },
    {
      Header: 'Role',
      Cell: (props) => <FormattedRole {...props} />
    },
    {
      Header: ' ',
      Cell: (props) => <ActionColumn {...props} openModal={openModal} setSelected={setSelected} />
    }
  ];

  return <Table columns={columns} data={data} isLoading={isLoading} />;
}

UsersTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func,
  setSelected: PropTypes.func
};

const ActionColumn = ({ row, openModal, setSelected }) => {
  return (
    <div className="flex space-x-4 justify-center">
      <div>
        <button
          className="text-gray-700"
          title="Edit"
          onClick={() => {
            setSelected(row.original.id);
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

const FormattedRole = ({ row }) => roles[row?.original?.role];

export default UsersTable;
