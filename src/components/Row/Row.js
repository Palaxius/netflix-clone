import React, {useEffect, useState} from 'react';
import './Row.css'

import {API_KEY, baseImagesUrl} from "../../helpers/requests";
import axios from "../../helpers/axios";
import {opts} from '../../helpers/requests'
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {

  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  async function getMovieTrailer(movie) {
    if (trailerUrl) {
          setTrailerUrl('')
        } else {
        await axios.get(`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`)
        .then(response => {
          if (response.data.results.length) {
            setTrailerUrl(response.data.results[0].key)
          } else {
            alert('Sorry, we dont have that trailer! Try later..')
          }
        }).catch(err => {
            alert('Sorry, we dont have that trailer! Try later..')
          })
      }
  }

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
              key={movie.id}
              onClick={() => getMovieTrailer(movie)}
            />
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      </div>
  );
};

export default Row;
