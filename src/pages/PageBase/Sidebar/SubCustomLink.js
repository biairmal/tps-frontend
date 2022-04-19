import PropTypes from 'prop-types';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

function SubCustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={`flex w-full pl-8 pr-4 py-3 rounded-r-xl text-left hover:bg-gray-50 ${
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

SubCustomLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string
};

export default SubCustomLink;
