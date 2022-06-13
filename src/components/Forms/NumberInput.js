import PropTypes from 'prop-types';

function NumberInput({
  disabled,
  error,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  register,
  step,
  defaultValue
}) {
  return (
    <div>
      <div className="font-medium">{label}</div>
      <input
        className={`mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      ${error && 'border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-500'} `}
        disabled={disabled}
        max={max}
        min={min}
        onKeyDown={(e) => {
          ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
        }}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        defaultValue={defaultValue}
        type="number"
        {...register(name)}
      />
      <p className={`text-sm text-rose-500 text-right ${error && '-mb-4'}`}>{error || ''}</p>
    </div>
  );
}

NumberInput.defaultProps = {
  disabled: false,
  error: '',
  label: '',
  name: '',
  placeholder: '',
  step: 1
};

NumberInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.any,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  step: PropTypes.number,
  defaultValue: PropTypes.number
};

export default NumberInput;
