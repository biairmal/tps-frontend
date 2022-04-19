import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import CustomLink from './CustomLink';
import SubCustomLink from './SubCustomLink';

function Sidebar({ isHidden }) {
  return (
    <div className={`bg-gray-100 w-72 h-screen pt-14 ${isHidden && 'hidden'}`}>
      <div className="px-4 pt-4 pb-2 text-sm text-gray-500 font-extrabold">Menu</div>
      <div>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <CustomLink to="/transactions">Panel Transaksi</CustomLink>
        <CustomLink to="/stocks">Manajemen Stok</CustomLink>
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <div className="w-full text-left font-bold">
              <Disclosure.Button className="px-4 py-3 rounded-r-xl text-gray-500 font-bold flex flex-row justify-between w-full items-center hover:bg-gray-50">
                <div>Laporan</div>
                {/*
              Use the `open` render prop to rotate the icon when the panel is open
            */}
                <ChevronDownIcon className={`h-6 w-6 ${open ? 'transform rotate-180' : ''}`} />
              </Disclosure.Button>
              
              <Disclosure.Panel>
                <SubCustomLink to="/invoices">Daftar Invoice</SubCustomLink>
                <SubCustomLink to="/report">Laporan Penjualan</SubCustomLink>
                <SubCustomLink to="/transactions/history">Riwayat Transaksi</SubCustomLink>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <CustomLink to="/users">Akun dan Pengguna</CustomLink>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isHidden: PropTypes.bool
};

export default Sidebar;
