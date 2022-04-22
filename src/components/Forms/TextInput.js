import PropTypes from 'prop-types';

function TextInput(props) {
  const { type, id, placeholder, name, label, onChange, register, error } = props;
  return (
    <div>
      <div className="font-medium">{label}</div>
      <input
        className={`mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      ${error && 'border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-500'} `}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...register(name)}
      />
      <p className={`text-sm text-rose-500 text-right ${error && '-mb-4'}`}>{error || ''}</p>
    </div>
  );
}

TextInput.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  type: 'text',
  error: ''
};

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.any,
  error: PropTypes.any
};

export default TextInput;
