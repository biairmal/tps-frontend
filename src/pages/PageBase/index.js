import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'api/api';
import authAPI from 'api/authAPI';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { UserContext } from 'context/UserContext';

function PageBase({ children }) {
  const [hideSidebar, setHideSidebar] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    Api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message === 'Not authenticated!'
        ) {
          authAPI.logout().then((res) => {
            if (res.status === 200) {
              setUser(null);
              navigate('/', { replace: true });
            }
          });
          return Promise.reject();
        } else if (error.response && error.response.status === 403) {
          navigate('/dashboard', { replace: true });
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div>
      <Navbar toggleSidebar={setHideSidebar} />
      <div className="w-full flex flex-row">
        <Sidebar isHidden={hideSidebar} user={user} />
        <main className="flex-1 pt-24 pb-32 px-12 overscroll-contain">{children}</main>
      </div>
    </div>
  );
}

PageBase.propTypes = {
  children: PropTypes.element
};

export default PageBase;
