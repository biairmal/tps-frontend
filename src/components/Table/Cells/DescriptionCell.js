import PropTypes from 'prop-types';

function DescriptionCell({ row }) {
  return <p>{row.original.description}</p>;
}

DescriptionCell.propTypes = {
  row: PropTypes.object
};

export default DescriptionCell;
