import PropTypes from 'prop-types';

function PageSize({ pageSize, setPageSize }) {
  return (
    <div className="select-none">
      <span className="">
        Show
        <select
          className="mx-1 rounded-md p-1 focus:outline-none shadow"
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
        >
          {[10, 20, 30].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        Entries
      </span>
    </div>
  );
}

PageSize.propTypes = {
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func
};

export default PageSize;
