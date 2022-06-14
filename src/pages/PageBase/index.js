import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'api/api';
import authAPI from 'api/authAPI';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { UserContext } from 'context/UserContext';

function PageBase({ children }) {
  const minDesktopWidth = 1366;
  const [hideSidebar, setHideSidebar] = useState(window.innerWidth < minDesktopWidth);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const updateMedia = () => {
    setHideSidebar(window.innerWidth < minDesktopWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
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
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <div>
      <Navbar toggleSidebar={setHideSidebar} />
      <div className="w-full min-w-max h-screen flex flex-row">
        <Sidebar
          isHidden={hideSidebar}
          isSmallScreen={window.innerWidth < minDesktopWidth}
          user={user}
        />
        <main className="flex-1 pt-24 pb-32 px-12 overflow-x-scroll">{children}</main>
      </div>
    </div>
  );
}

PageBase.propTypes = {
  children: PropTypes.element
};

export default PageBase;
