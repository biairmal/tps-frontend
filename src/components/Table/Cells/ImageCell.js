import PropTypes from 'prop-types';

function ImageCell({ row }) {
  if (row.original.picture) {
    return (
      <div className="flex justify-center">
        <div className="aspect-video w-32 my-2 rounded-md overflow-hidden">
          <img alt="Item" className="object-contain w-full h-full" src={row.original.picture} />
        </div>
      </div>
    );
  }
  return <div className="w-40 h-24 rounded-md bg-gray-200"></div>;
}

ImageCell.propTypes = {
  row: PropTypes.object
};

export default ImageCell;
