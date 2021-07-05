import React, { useEffect, useState } from "react";

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

  return (
    <div>
      {isCharLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            {characterInfo.name} is a fictional character in a cartoon series
            Rick and Morty for adults.
            {characterInfo.type === ""
              ? " ."
              : ` The type of the character is ${characterInfo.type}. `}
            The character is a member of {characterInfo.species} species. The
            current status of the character is {characterInfo.status}.
            {characterInfo.origin.name === "unknown"
              ? " "
              : ` The character is orginally from ${characterInfo.origin.name} and is currently located in ${characterInfo.location.name}.`}
            The character has shown in {characterInfo.episode.length} episodes
            in the series.
            {characterInfo.episode.length > 35
              ? "Character is one of two main characters of the show."
              : ""}
          </p>
          <img src={`${characterInfo.image}`} alt="character" />
        </div>
      )}
    </div>
  );
}

export default Character;
