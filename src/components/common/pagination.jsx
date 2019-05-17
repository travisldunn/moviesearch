import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, currentPage, onPageChange }) => {
  if (itemsCount === 1) return null;

  let pages = [];
  let extra = false;

  if (itemsCount < 5) {
    pages = _.range(1, itemsCount + 1);
  } else {
    if (itemsCount - currentPage < 5) {
      pages = _.range(itemsCount - 5, itemsCount + 1);
    } else {
      pages = _.range(currentPage, currentPage + 5);
      extra = true;
    }
  }

  return (
    <div className="paginate">
      <button className="last" onClick={() => onPageChange(currentPage - 1)}>
        &laquo;
      </button>
      {pages.map(page => (
        <button
          className={currentPage === page ? "active" : ""}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <h1 className={extra ? "extra active" : "extra"}>...</h1>
      <button
        className={extra ? "extra active" : "extra"}
        onClick={() => onPageChange(itemsCount)}
      >
        {itemsCount}
      </button>
      <button className="next" onClick={() => onPageChange(currentPage + 1)}>
        &raquo;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
