import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/outline';

function DeleteCell({ row, handleDelete }) {
  return (
    <button
      className="text-red-500"
      onClick={() => {
        console.log(row.id)
        handleDelete(row.id);
      }}
      title="Delete"
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  );
}

DeleteCell.propTypes = {
  row: PropTypes.object,
  handleDelete: PropTypes.func
};

export default DeleteCell;
