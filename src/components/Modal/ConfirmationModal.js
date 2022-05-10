import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

function ConfirmationModal({ isOpen, closeModal, title, description, handler, proceed, cancel }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>

                <div className="mt-8 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500"
                    onClick={closeModal}
                  >
                    {cancel}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border-2 border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 "
                    onClick={handler}
                  >
                    {proceed}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handler: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  proceed: PropTypes.string,
  cancel: PropTypes.string
};

ConfirmationModal.defaultProps = {
  title: 'Confirmation',
  description: 'This is default description.',
  proceed: 'Yes',
  cancel: 'Cancel'
};

export default ConfirmationModal;
