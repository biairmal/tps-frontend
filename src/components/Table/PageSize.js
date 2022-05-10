import PropTypes from 'prop-types';

function PageSize({ pageSize, setPageSize }) {
  return (
    <div className="select-none">
      <div className="flex space-x-2 items-center">
        <div>Tampilkan</div>
        <select
          className="mx-1 rounded-md p-1 focus:outline-none shadow"
          onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
          value={pageSize}
        >
          {[10, 20, 30].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div>Row</div>
      </div>
    </div>
  );
}

PageSize.propTypes = {
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func
};

export default PageSize;
