import PropTypes from 'prop-types';

function PrimaryButton({ onClick, text }) {
  return (
    <button
      className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md w-max"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};

export default PrimaryButton;
