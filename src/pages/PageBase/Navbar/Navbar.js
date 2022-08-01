import PropTypes from 'prop-types';
import { MenuIcon } from '@heroicons/react/solid';
import Dropdown from './Drowpdown';

function Navbar({ toggleSidebar }) {
  return (
    <div className="bg-neutral-800 p-2 w-full flex flex-row justify-between fixed top-0 z-30">
      <div className="flex flex-row space-x-2 items-center">
        <button
          className="p-1 rounded-md hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            toggleSidebar((prevState) => !prevState);
          }}
        >
          <MenuIcon className="h-6 w-6 text-white" />
        </button>
        <div className="text-sm text-white font-semibold py-2">Transaction Processing System</div>
      </div>

      <Dropdown />
    </div>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func
};

export default Navbar;
