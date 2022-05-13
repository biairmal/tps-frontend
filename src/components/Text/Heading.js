import PropTypes from 'prop-types';

function Heading({ children }) {
  return <h1 className="text-5xl text-sky-500 font-medium">{children}</h1>;
}

Heading.propTypes = {
  children: PropTypes.string
};

export default Heading;
