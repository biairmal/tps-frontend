import PropTypes from 'prop-types';
function TextAreaInput({ label, name, error, placeholder, onChange, disabled, register }) {
  return (
    <div>
      <div className="font-medium">{label}</div>
      <textarea
        className={`mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         ${error && 'border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-500'} `}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...register(name)}
        rows="5"
      />
      <p className={`text-sm text-rose-500 text-right ${error && '-mb-4'}`}>{error || ''}</p>
    </div>
  );
}

TextAreaInput.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  error: '',
  disabled: false
};

TextAreaInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  error: PropTypes.any,
  disabled: PropTypes.bool
};

export default TextAreaInput;
