import Table from 'components/Table/Table';

function UsersTable() {
  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Nama depan', accessor: 'firstName' },
    { Header: 'Nama belakang', accessor: 'lastName' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Aksi',
      Cell: () => {
        return <div>test</div>;
      }
    }
  ];

  const data = [
    { id: 1, username: 'test1', firstName: 'Test', lastName: '1', role: 'admin' },
    { id: 2, username: 'test2', firstName: 'Test', lastName: '2', role: 'admin' },
    { id: 3, username: 'test3', firstName: 'Test', lastName: '3', role: 'admin' }
  ];

  return <Table columns={columns} data={data} />;
}

export default UsersTable;
