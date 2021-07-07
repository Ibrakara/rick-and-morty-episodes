import React, { useEffect, useState } from "react";
import "./styles/Character.css";

function Character({ match }) {
  const [characterInfo, setCharacterInfo] = useState({});
  const [isCharLoading, setIsCharLoading] = useState(true);
  const characterId = match.params.id;

  useEffect(() => {
    const fetchChar = async () => {
      const charResponse = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      const charData = await charResponse.json();
      setCharacterInfo(charData);
      setIsCharLoading(false);
    };
    fetchChar();
  }, []);

  return isCharLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="character-page-container">
      <h3 id="character-name">{characterInfo.name}</h3>
      <img id="character-img" src={`${characterInfo.image}`} alt="character" />
      <p className="character-description">
        {characterInfo.name} is a fictional character in a cartoon series Rick
        and Morty for adults
        {characterInfo.type === ""
          ? ". "
          : ` The type of the character is ${characterInfo.type}. `}
        The character is a member of {characterInfo.species} species. The
        current status of the character is {characterInfo.status}.
        {characterInfo.origin.name === "unknown"
          ? " "
          : ` The character is orginally from ${characterInfo.origin.name} and is currently located on ${characterInfo.location.name}. `}
        The character has shown in {characterInfo.episode.length} episodes in
        the series.
        {characterInfo.episode.length > 35
          ? "Character is one of two main characters of the show."
          : ""}
      </p>
    </div>
  );
}

export default Character;
