import PropTypes from 'prop-types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

function ActionCell({ row, handleEdit, handleDelete }) {
  return (
    <div className="flex space-x-4 justify-center">
      <div>
        <button
          className="text-gray-700"
          title="Edit"
          onClick={() => {
            handleEdit(row.original.id);
          }}
        >
          <PencilAltIcon className="w-4 h-4" />
        </button>
      </div>
      <div>
        <button
          className="text-red-500"
          onClick={() => {
            handleDelete(row.original.id);
          }}
          title="Delete"
        >
          <TrashIcon className="w-4 h-4" />
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
