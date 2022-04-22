import { Link } from 'react-router-dom';
import UsersTable from './UsersTable';

function ManageUserPage() {
  return (
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Akun dan Pengguna</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Daftar Pengguna</h2>
        <div className="max-w-7xl">
          <Link to="/users/create" className="w-min">
            <button className="bg-sky-500 text-white py-2 px-4 rounded-md w-max">
              Tambahkan Pengguna
            </button>
          </Link>
          <UsersTable />
        </div>
      </div>
    </>
  );
}

export default ManageUserPage;
