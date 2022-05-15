import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton({ children, to }) {
  return (
    <Link to={to} className="w-min">
      <button className="border-2 border-sky-500 text-sky-500 hover:bg-gray-50 text-sm py-2 px-4 font-semibold rounded-md w-max">
        {children}
      </button>
    </Link>
  );
}

LinkButton.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string
};

export default LinkButton;
