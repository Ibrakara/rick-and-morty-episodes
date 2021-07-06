import React from "react";
import "./styles/Pagination.css";

function Pagination({
  totalNumOfEpisodes,
  episodesPerPage,
  changePage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  const prevPage = () => {
    setCurrentPage((prevVal) => {
      return prevVal > 1 ? prevVal - 1 : prevVal;
    });
  };
  const nextPage = () => {
    const totalPageNumber = Math.ceil(totalNumOfEpisodes / episodesPerPage);
    setCurrentPage((prevVal) => {
      return prevVal < totalPageNumber ? prevVal + 1 : prevVal;
    });
  };
  for (let i = 1; i <= Math.ceil(totalNumOfEpisodes / episodesPerPage); i++) {
    pageNumbers.push(i);
  }
  const pageNumberList = pageNumbers.map((number) => (
    <button
      className="page-number"
      key={number}
      onClick={() => changePage(number)}
    >
      {number}
    </button>
  ));

  return (
    <div className="pagination-container">
      <button className="navigation-button page-number" onClick={prevPage}>
        Prev
      </button>
      {pageNumberList}
      <button className="navigation-button page-number" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
