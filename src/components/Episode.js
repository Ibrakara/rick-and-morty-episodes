import React, { useEffect, useState } from "react";
import Character from "./Character";
import { Link } from "react-router-dom";

function Episode({ match }) {
  const [episode, setEpisode] = useState({});
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(true);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const episodeName = episode.name;
  const episodeDate = episode.air_date;
  const episodeNum = episode.episode;
  const episodeCharList = episodeCharacters.map((char) => {
    return (
      <Link key={char.id} to={`/characters/${char.id}`}>
        <p>{char.name}</p>
        <img src={`${char.image}`} alt="character" />
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

      console.log(result);
      setEpisodeCharacters(result);
    };
  }, []);

  return (
    <div>
      {isEpisodeLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{episodeName}</h2>
          <h3>{episodeDate}</h3>
          <h4>{episodeNum}</h4>
          {episodeCharList}
        </div>
      )}
    </div>
  );
}

export default Episode;
