import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function InvoiceButton({ row }) {
  const navigate = useNavigate();

  const redirect = (name) => {
    navigate(`/invoices/${name}`);
  };

  return (
    <button
      className="text-sky-700 font-medium hover:underline"
      onClick={() => redirect(row.original.invoice)}
    >
      <div className="flex flex-row space-x-1">
        <div>{row.original.invoice}</div>
      </div>
    </button>
  );
}

InvoiceButton.propTypes = {
  handleClick: PropTypes.func,
  row: PropTypes.object
};

export default InvoiceButton;
