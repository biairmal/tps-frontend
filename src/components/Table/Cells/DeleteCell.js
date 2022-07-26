import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/outline';

function DeleteCell({ row, handleDelete }) {
  return (
    <div className="flex space-x-3 justify-center text-sm">
      <button
        className="text-red-500 flex flex-row items-center space-x-1"
        onClick={() => {
          handleDelete(row.id);
        }}
        title="Delete"
      >
        <TrashIcon className="w-4 h-4" />
        <div>Hapus</div>
      </button>
    </div>
  );
}

DeleteCell.propTypes = {
  row: PropTypes.object,
  handleDelete: PropTypes.func
};

export default DeleteCell;
