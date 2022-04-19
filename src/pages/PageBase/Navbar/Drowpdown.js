import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { PencilAltIcon, LogoutIcon } from '@heroicons/react/outline';

function Dropdown() {
  return (
    <div className="w-56 text-right mr-8">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:bg-opacity-5">
            <div className="text-sm text-white font-semibold">Hi, Admin!</div>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-white" />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 ">
            <Menu.Item>
              <div className="text-gray-900 flex flex-col space-y-1 w-full text-sm">
                <div className="font-bold">Admin Profile</div>
                <div className="text-xs first-letter:">Role</div>
              </div>
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-sky-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full p-2 text-sm space-x-2`}
                >
                  <PencilAltIcon className="w-4 h-4" />
                  <div>Edit Profile</div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-sky-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full p-2 text-sm space-x-2`}
                >
                  <LogoutIcon className="w-4 h-4" />
                  <div>Logout</div>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default Dropdown;
