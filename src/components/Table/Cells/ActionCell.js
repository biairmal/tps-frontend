import PropTypes from 'prop-types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

function ActionCell({ row, handleEdit, handleDelete }) {
  return (
    <div className="flex space-x-3 justify-center text-sm">
      <div>
        <button
          className="text-gray-700 flex flex-row items-center space-x-1"
          title="Edit"
          onClick={() => {
            handleEdit(row.original.id);
          }}
        >
          <PencilAltIcon className="w-4 h-4" />
          <div>Edit</div>
        </button>
      </div>
      <div>
        <button
          className="text-red-500 flex flex-row items-center space-x-1"
          onClick={() => {
            handleDelete(row.original.id);
          }}
          title="Delete"
        >
          <TrashIcon className="w-4 h-4" />
          <div>Hapus</div>
        </button>
      </div>
    </div>
  );
}

ActionCell.propTypes = {
  row: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
};

export default ActionCell;
