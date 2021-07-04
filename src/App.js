import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Character from "./components/Character";
import Episode from "./components/Episode";
import Episodes from "./components/Episodes";

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage, setEpisodesPerPage] = useState(5);

  const apiMaxNumberOfEpisodesPerPage = 20;
  const apiPageNumber = Math.ceil(
    episodesPerPage / apiMaxNumberOfEpisodesPerPage
  );
  useEffect(() => {
    const fetchData = async () => {
      console.log(apiPageNumber);
      const episodeResponse = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${apiPageNumber}`
      );
      const episodesData = await episodeResponse.json();
      setEpisodes(episodesData.results);
      setLoading(false);
    };
    fetchData();
  }, [apiPageNumber]);

  return (
    <Router>
      <h1>Rick and Morty Episode Guide</h1>
      <Switch>
        <Route exact path="/">
          <Episodes episodes={episodes} loading={loading} />
        </Route>
        <Route path="/episodes/:id" component={Episode} />
        <Route path="/characters/:id" component={Character} />
      </Switch>
    </Router>
  );
}

export default App;
