import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Episode.css";

function Episode({ match }) {
  const [episode, setEpisode] = useState({});
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(true);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const episodeName = episode.name;
  const episodeDate = episode.air_date;
  const episodeNum = episode.episode;
  const episodeCharList = episodeCharacters.map((char) => {
    return (
      <Link
        className="character-link"
        key={char.id}
        to={`/characters/${char.id}`}
      >
        <p className="episode-character-name">{char.name}</p>
        <img
          className="episode-character-img"
          src={`${char.image}`}
          alt="character-tumbnail"
        />
      </Link>
    );
  });

  useEffect(() => {
    const episodeId = match.params.id;
    const fetchEpisode = async () => {
      const episodeResponse = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );
      const episodeData = await episodeResponse.json();
      setEpisode(episodeData);
      fetchCharacters(episodeData);
      setIsEpisodeLoading(false);
    };
    fetchEpisode();

    const fetchCharacters = async (episodeData) => {
      const fetchChar = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      };

      const promises = [];
      for (let i = 0; i < episodeData.characters.length; i++) {
        promises.push(fetchChar(episodeData.characters[i]));
      }
      const result = [];
      await Promise.all(promises).then((results) =>
        results.forEach((elem) => result.push(elem))
      );

      setEpisodeCharacters(result);
    };
  }, []);

  return isEpisodeLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="episode-detail-container">
      <h2 id="episode-name" className="episode-element">
        {episodeName}
      </h2>
      <h3 id="episode-date" className="episode-element">
        {episodeDate}
      </h3>
      <h4 id="episode-number" className="episode-element">
        {episodeNum}
      </h4>
      <h2 id="character-container-title">Characters</h2>
      <ul className="characters-container">{episodeCharList}</ul>
    </div>
  );
}

export default Episode;
