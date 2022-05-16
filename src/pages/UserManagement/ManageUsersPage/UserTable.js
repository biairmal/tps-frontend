import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Table from 'components/Table/Table';
import { ActionCell } from 'components/Table/Cells';
import roles from 'config/roles';

function UserTable({ data, openModal, setSelected }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = (id) => {
    setSelected(id);
    openModal();
  };

  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Nama depan', accessor: 'firstName' },
    { Header: 'Nama belakang', accessor: 'lastName' },
    {
      Header: 'Role',
      Cell: ({ row }) => roles[row?.original?.role]
    },
    {
      Header: ' ',
      Cell: (props) => <ActionCell {...props} handleEdit={handleEdit} handleDelete={handleDelete} />
    }
  ];

  return <Table columns={columns} data={data} />;
}

UserTable.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  setSelected: PropTypes.func
};

export default UserTable;
