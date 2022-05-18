import PropTypes from 'prop-types';

function SubmitButton({ id, hidden, text }) {
  return (
    <button
      id={id}
      type="submit"
      className={`bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md w-max ${
        hidden ? 'hidden' : ''
      }`}
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  id: PropTypes.string,
  hidden: PropTypes.bool,
  text: PropTypes.string
};

export default SubmitButton;
