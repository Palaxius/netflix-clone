import React, {useEffect, useState} from 'react';
import './Row.css'
import axios from "../../helpers/axios";
import {baseImagesUrl} from "../../helpers/requests";

const Row = ({ title, fetchUrl, isLargeRow }) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && 'row__poster-large'}`}
            src={`${baseImagesUrl}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            key={movie.id}/>
        ))}
      </div>
    </div>
  );
};

export default Row;
