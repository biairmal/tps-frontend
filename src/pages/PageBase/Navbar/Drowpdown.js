import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { PencilAltIcon, LogoutIcon } from '@heroicons/react/outline';
import authAPI from 'api/authAPI';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'context/UserContext';
import roles from 'config/roles';

function Dropdown() {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      const res = await authAPI.logout();
      if (res.status === 200) {
        setUser(null);
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-56 text-right mr-8">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:bg-opacity-5">
            <div className="text-sm text-white font-semibold">{`Hi, ${user?.firstName}!`}</div>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-white" />
          </Menu.Button>
        </div>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className={`absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="p-4 ">
              <Menu.Item>
                <div className="text-gray-900 flex flex-col space-y-1 w-full text-sm">
                  <div className="font-bold">{`${user?.firstName} ${user?.lastName}`}</div>
                  <div className="text-xs first-letter:">{user ? roles[user?.role] : ''}</div>
                </div>
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate('/profile/edit')}
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
                    onClick={logout}
                  >
                    <LogoutIcon className="w-4 h-4" />
                    <div>Logout</div>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Dropdown;
