import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "../index";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED!");
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log("STATE", this.props.store.getState());
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    console.log("RENDER!");

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieInFavourites(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

export default AppWrapper;
