import React from "react";
import { Link } from "react-router-dom";
import Episode from "./Episode";

const Episodes = (props) => {
  const loading = props.loading;
  const episodes = props.episodes;
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
  return <ul>{episodeList}</ul>;
};

export default Episodes;
