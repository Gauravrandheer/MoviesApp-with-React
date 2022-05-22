import React, { Component } from 'react'

import {movies} from "../movieData"

import axios from 'axios'

export class Banner extends Component {
  render() {
    let movieElem = movies.results[Math.floor(Math.random()*10)]
    let backdrop = movieElem.backdrop_path
    let movietitle = movieElem.original_title
    let movieDetails = movieElem.overview
    return (
      <div>
        <div className="card banner-card" >
        <img src={`https://image.tmdb.org/t/p/original${backdrop}`} className="card-img-top banner-img" alt="..."/>
          <h5 className="card-title banner-title">{movietitle}</h5>
          <p className="card-text banner-text">{movieDetails}</p>
      </div>
      </div>
    )
  }
}

export default Banner