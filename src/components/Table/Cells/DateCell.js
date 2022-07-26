import PropTypes from 'prop-types';
import { months } from 'config/date';

export const getTime = (date) => {
  const jsDate = new Date(date);
  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return { day, month: months[month], year };
};

function DateCell({ row, groupBy, columnName='date' }) {
  const { day, month, year } = getTime(row.original[columnName]);

  const formattedDate = () => {
    if (groupBy === 'day') return `${day} ${month} ${year}`;
    if (groupBy === 'month') return `${month} ${year}`;
    if (groupBy === 'year') return `${year}`;
    else `error`;
  };
  return <div>{formattedDate()}</div>;
}

DateCell.propTypes = {
  columnName: PropTypes.string,
  groupBy: PropTypes.string,
  row: PropTypes.object
};

export default DateCell;
