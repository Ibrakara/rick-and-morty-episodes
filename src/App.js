import { useEffect, useState } from "react";

function App() {
  const [episodes, setEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [episodesPerPage, setEpisodesPerPage] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      const episodeResponse = await fetch("https://rickandmortyapi.com/api/episode")
      const episodesData = await episodeResponse.json()
      setEpisodes(episodesData)
    }
    fetchData()
    console.log(episodes)
  }, [])

  return (
    <div className="App">
      <h1>Rick and Morty Episode Guide</h1>
      
    </div>
  );
}

export default App;
