import { useMemo } from 'react';
import PropTypes from 'prop-types';
import checkURL from 'helpers/checkURL';

function ImageInput({ error, label, name, register, watchImage }) {
  const imageURL = useMemo(() => {
    if (typeof watchImage === 'string' && checkURL(watchImage)) return watchImage;
    if (watchImage?.length > 0 && watchImage !== 'undefined') {
      return URL.createObjectURL(watchImage[0]);
    }

    return '';
  }, [watchImage]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="font-medium">{label}</div>
      {/* Image Preview */}
      <div className="w-full flex align-middle justify-center aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img className="object-contain" src={imageURL} />
      </div>
      {/* Choose File */}
      <div className="block border-2 rounded-lg">
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          {...register(name)}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-l-md file:border-0
            file:text-sm file:font-semibold
            file:bg-sky-500 file:text-white
            file:cursor-pointer hover:file:bg-sky-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            focus:rounded-lg
                "
        />
      </div>
      <p className={`text-sm text-rose-500 text-right ${error && '-mb-4'}`}>{error || ''}</p>
    </div>
  );
}

ImageInput.propTypes = {
  error: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  watchImage: PropTypes.any
};

export default ImageInput;
