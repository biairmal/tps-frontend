import { PulseLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-0" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex flex-col min-h-full items-center justify-center p-4 text-center">
          <PulseLoader color={'gray'} size={15} />
        </div>
      </div>
    </div>
  );
}

export default Loader;
