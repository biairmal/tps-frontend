import PropTypes from 'prop-types';

function InfoBox({ title, info }) {
  return (
    <div className="flex flex-col space-y-2 bg-white border pr-8 pb-8 pt-4 pl-4 shadow-md rounded-md min-w-max w-52 text-sky-500 font-bold">
      <div>{title}</div>
      <div className="text-4xl whitespace-nowrap">{info}</div>
    </div>
  );
}

InfoBox.propTypes = {
  title: PropTypes.string,
  info: PropTypes.any
};
export default InfoBox;
