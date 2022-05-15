import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [navigation, setNavigation] = useState({
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    totalRows: 0
  });

  return { currentPage, setCurrentPage, pageSize, setPageSize, navigation, setNavigation };
};
