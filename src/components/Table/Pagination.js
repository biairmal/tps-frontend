import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/solid';

function Pagination({ currentPage, setCurrentPage, hasNext, hasPrev, totalPages }) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (selectedPage) => setCurrentPage(selectedPage);

  useEffect(() => {
    if (hasNext) setCanGoNext(true);
    else setCanGoNext(false);
    if (hasPrev) setCanGoBack(true);
    else setCanGoBack(false);
  }, [hasNext, hasPrev]);

  return (
    <div className="flex justify-between px-2">
      <div>
        Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          onClick={() => {
            onPageSelect(1);
          }}
          disabled={!canGoBack}
        >
          <ChevronDoubleLeftIcon className="w-6 h-6 text-white" />
        </Button>
        <Button onClick={() => onPrevPage()} disabled={!canGoBack}>
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </Button>
        <input
          type="number"
          className="w-10 border-2 text-center text-lg pl-3 appearance-none outline-none"
          value={currentPage}
          min={1}
          max={totalPages}
          onChange={(e) => {
            onPageSelect(parseInt(e.target.value, 10));
          }}
        />
        <Button onClick={() => onNextPage()} disabled={!canGoNext}>
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </Button>
        <Button
          onClick={() => {
            onPageSelect(totalPages);
          }}
          disabled={!canGoNext}
        >
          <ChevronDoubleRightIcon className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  totalPages: PropTypes.number
};

const Button = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-sky-500 rounded-md p-1 disabled:bg-opacity-40"
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Pagination;
