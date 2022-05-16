import PropTypes from 'prop-types';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md w-max"
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string
};

export default SubmitButton;
