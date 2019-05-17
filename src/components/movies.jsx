import React, { Component } from "react";
import MovieBox from "./movieBox";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";

const API_KEY = process.env.REACT_APP_API_KEY;
const apiEndpoint = apiUrl + API_KEY;

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    searchQuery: "big"
  };

  componentDidMount() {
    this.fetchPosts(this.state.searchQuery);
  }

  fetchPosts(query) {
    if (!query) return;
    fetch(`${apiEndpoint}&query=${query}&page=${this.state.currentPage}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({ movies: data.results, totalPages: data.total_pages })
      )
      .catch(error => console.error("Error:", error));
  }

  handlePageChange = page => {
    if (page > this.state.totalPages || page < 1) return;
    this.setState(
      () => {
        return {
          currentPage: page
        };
      },
      () => {
        this.fetchPosts(this.state.searchQuery);
      }
    );
  };

  handleSearch = query => {
    this.setState({ searchQuery: query });
    this.setState({ currentPage: 1 });
    this.fetchPosts(query);
  };

  render() {
    const { currentPage, totalPages, movies } = this.state;

    return (
      <div className="movieContainer">
        <h1>Movie Search</h1>
        <SearchBox onChange={this.handleSearch} />
        <Pagination
          itemsCount={totalPages}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        {movies &&
          movies.map(movie => (
            <MovieBox key={movie.id} imgUrl={imgUrl} movie={movie} />
          ))}
        <Pagination
          itemsCount={totalPages}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
