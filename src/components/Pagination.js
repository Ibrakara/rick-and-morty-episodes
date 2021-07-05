import React from "react";

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
    setCurrentPage((prevVal) => {
      return prevVal < 9 ? prevVal + 1 : prevVal;
    });
  };
  for (let i = 1; i <= Math.ceil(totalNumOfEpisodes / episodesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={prevPage}>Prev</button>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => changePage(number)}>
          {number}
        </button>
      ))}
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default Pagination;
