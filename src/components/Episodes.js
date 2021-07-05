import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Episodes = (props) => {
  const loading = props.loading;
  const episodes = props.currentPageEpisodes;
  const episodesPerPage = props.episodesPerPage;
  const totalNumOfEpisodes = props.totalNumOfEpisodes;
  const changePage = props.changePage;
  const setCurrentPage = props.setCurrentPage;
  const episodeList = episodes.map((episode) => {
    return (
      <Link key={episode.id} to={`/episodes/${episode.id}`}>
        <li>{episode.name}</li>
      </Link>
    );
  });
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <ul>{episodeList}</ul>
      <Pagination
        totalNumOfEpisodes={totalNumOfEpisodes}
        changePage={changePage}
        episodesPerPage={episodesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Episodes;
