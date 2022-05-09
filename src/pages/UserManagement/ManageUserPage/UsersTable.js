import PropTypes from 'prop-types';
import Table from 'components/Table/Table';

function UsersTable({ data, isLoading }) {
  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Nama depan', accessor: 'firstName' },
    { Header: 'Nama belakang', accessor: 'lastName' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: ' ',
      Cell: () => {
        return (
          <div className="flex space-x-3 justify-center">
            <div>
              <button className="font-bold text-gray-700">Edit</button>
            </div>
            <div>
              <button className="font-bold text-red-600">Hapus</button>
            </div>
          </div>
        );
      }
    }
  ];

  return <Table columns={columns} data={data} isLoading={isLoading} />;
}

UsersTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default UsersTable;
