import React, {useEffect, useState} from 'react';
import './Banner.css'

import requests, {baseImagesUrl} from "../../helpers/requests";
import { randomRequest} from "../../helpers/randomRequest";
import {truncate} from "../../helpers/truncate";
import axios from "../../helpers/axios";

const Banner = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests[randomRequest])
      const randomNumberOfArray = Math.floor(Math.random() * request.data.results.length)
      setMovie(request.data.results[randomNumberOfArray])
    }
    fetchData()
  }, [])


  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url(${baseImagesUrl}${movie?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div className="banner__content">
        <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner__buttons">
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My list</button>
        </div>

        <h2 className='banner__description'>
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
      <div className='banner-fadeBottom' />
    </header>
  );
};

export default Banner;
