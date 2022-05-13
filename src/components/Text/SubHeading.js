import PropTypes from 'prop-types';

function SubHeading({ children }) {
  return <h2 className="text-2xl">{children}</h2>;
}
SubHeading.propTypes = {
  children: PropTypes.string
};

export default SubHeading;
