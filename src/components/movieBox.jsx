import React from "react";
import noPhoto from "../images/noPhoto.jpg";

const MovieBox = ({ movie, imgUrl }) => {
  let imgSrc = noPhoto;
  if (movie.poster_path) {
    imgSrc = imgUrl + movie.poster_path;
  }
  return (
    <div className="movieBox">
      <img
        alt={
          movie.poster_path ? `${movie.title} Poster` : "No Poster Available"
        }
        src={imgSrc}
      />
      <h1 className="title">{movie.title}</h1>
      <h1 className="released">Released: {movie.release_date}</h1>
      <p className="overview">{movie.overview}</p>
    </div>
  );
};

export default MovieBox;
