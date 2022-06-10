import React from 'react';

import { usePagination, DOTS } from 'components/web/pagination/usePagination';
const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="centered">
      <ul className={className}>
        <li className={`page-item  ${currentPage === 1 ? 'disable' : ''}`} onClick={onPrevious}>
          <div className="page-item">Trước</div>
        </li>
        {paginationRange.map((pageNumber) => {
          <p>{pageNumber}</p>;
          if (pageNumber === DOTS) {
            return <li className="page-item dots">&#8230;</li>;
          }

          return (
            <li key={pageNumber} className={`page-item  ${pageNumber === currentPage ? 'active' : ''}`} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          );
        })}
        <li className={`page-item  ${currentPage === lastPage ? 'disable' : ''}`} onClick={onNext}>
          <div className="page-item">Sau</div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
