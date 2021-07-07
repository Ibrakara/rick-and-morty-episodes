import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Character from "./components/Character";
import Episode from "./components/Episode";
import Episodes from "./components/Episodes";

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 9;
  const currentPageLastIndex = currentPage * episodesPerPage;
  const currentPageFirstIndex = currentPageLastIndex - episodesPerPage;
  const currentEpisodes = episodes.slice(
    currentPageFirstIndex,
    currentPageLastIndex
  );
  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const apiMaxNumberOfEpisodesPerPage = 20;
  const apiPageNumber = Math.ceil(
    episodesPerPage / apiMaxNumberOfEpisodesPerPage
  );
  useEffect(() => {
    const fetchData = async () => {
      const fetchSingleEpisodePage = async (apiEpisodesPageNum) => {
        const episodeResponse = await fetch(
          `https://rickandmortyapi.com/api/episode?page=${apiEpisodesPageNum}`
        );
        const episodesData = await episodeResponse.json();
        return episodesData;
      };
      const promisesArr = [];
      for (let i = 1; i <= 3; i++) {
        promisesArr.push(fetchSingleEpisodePage(i));
      }
      const dataArr = [];
      await Promise.all(promisesArr).then((results) =>
        results.forEach((elem) =>
          elem.results.forEach((subElem) => dataArr.push(subElem))
        )
      );
      setEpisodes(dataArr);
      setLoading(false);
    };
    fetchData();
  }, [apiPageNumber]);

  return (
    <Router>
      <Switch>
        <Route exact path="/rick-and-morty-episodes">
          <Episodes
            currentPageEpisodes={currentEpisodes}
            loading={loading}
            episodesPerPage={episodesPerPage}
            changePage={changePage}
            totalNumOfEpisodes={episodes.length}
            setCurrentPage={setCurrentPage}
          />
        </Route>
        <Route path="/episodes/:id" component={Episode} />
        <Route path="/characters/:id" component={Character} />
      </Switch>
    </Router>
  );
}

export default App;
