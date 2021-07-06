import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import "../components/styles/Episodes.css";

const Episodes = (props) => {
  const loading = props.loading;
  const episodes = props.currentPageEpisodes;
  const episodesPerPage = props.episodesPerPage;
  const totalNumOfEpisodes = props.totalNumOfEpisodes;
  const changePage = props.changePage;
  const setCurrentPage = props.setCurrentPage;
  const episodeList = episodes.map((episode) => {
    return (
      <Link
        className="episode-list-item"
        key={episode.id}
        to={`/episodes/${episode.id}`}
      >
        {episode.name}
      </Link>
    );
  });
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="episodes-container">
      <h1 id="title">Rick and Morty Episode Guide</h1>
      <ul className="episodes-list">{episodeList}</ul>
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
