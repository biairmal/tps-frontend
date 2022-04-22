import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function CustomLink({ children, to, ...props }) {
  const location = useLocation();
  let match = location.pathname.split('/')[1] === to.replace('/', '');

  return (
    <div>
      <Link
        className={`flex w-full px-4 py-3 rounded-r-xl text-left hover:bg-gray-50 ${
          match ? 'text-sky-500 font-extrabold' : 'text-gray-500 font-bold'
        }`}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

CustomLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string
};

export default CustomLink;
