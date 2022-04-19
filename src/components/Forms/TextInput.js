import PropTypes from 'prop-types';

function TextInput(props) {
  const { type, id, placeholder, name, label, onChange } = props;
  return (
    <div>
      <div className="font-semibold">{label}</div>
      <input
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        type={type}
      ></input>
    </div>
  );
}

TextInput.defaultProps = {
  id: '',
  label: '',
  name: '',
  placeholder: '',
  type: 'text'
};

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default TextInput;
