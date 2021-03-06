import PropTypes from 'prop-types';

function SelectInput(props) {
  const { id, name, label, onChange, options, register, selected, defaultValue, disabled } = props;
  return (
    <div>
      <div className="font-medium">{label}</div>
      <select
        className={`mt-2 form-select block w-full px-3 py-2 text-sm text-gray-700 bg-white 
        bg-clip-padding bg-no-repeat border border-solid border-slate-300 
        rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
        focus:border-sky-400 focus:ring-1 focus:ring-sky-500 focus:outline-none`}
        disabled={disabled}
        defaultValue={defaultValue}
        id={id}
        onChange={onChange}
        {...register(name)}
      >
        {options.length > 0 &&
          options.map(({ option, value }, index) => (
            <option key={index} value={value} selected={selected === value ? true : undefined}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectInput.defaultProps = {
  id: '',
  label: '',
  name: '',
  options: [],
  defaultValue: undefined
};

SelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  register: PropTypes.func,
  selected: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool
};

export default SelectInput;
