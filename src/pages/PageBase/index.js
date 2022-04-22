import PropTypes from 'prop-types';
import { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

function PageBase({ children }) {
  const [hideSidebar, setHideSidebar] = useState(false);
  return (
    <div>
      <Navbar toggleSidebar={setHideSidebar} />
      <div className="w-full flex flex-row">
        <Sidebar isHidden={hideSidebar} />
        <main className="flex-1 pt-24 pl-12 pb-32 pr-8 ">{children}</main>
      </div>
    </div>
  );
}

PageBase.propTypes = {
  children: PropTypes.element
};

export default PageBase;
