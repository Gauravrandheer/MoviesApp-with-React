import React, { Component } from 'react'


import { movies } from '../movieData'
export class Favourites extends Component {

    constructor() {
        super()

        this.state = {
            genre: [],
            currentgenre: 'All genre',
            movie:[],
            currenttext:''
        }
    }
    componentDidMount() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

       
        let data = JSON.parse(localStorage.getItem('moviefavourites') || '[]')
        let temparr = []
        data.map((dataobj) => {
            if (!temparr.includes(genreids[dataobj.genre_ids[0]])) {
                temparr.push(genreids[dataobj.genre_ids[0]])
            }
        })
        temparr.unshift('All genre')

        this.setState({
            movie:[...data],
          genre:[...temparr]
        })
    }

    handlegenreChange =(genre)=>{

        this.setState({
            currentgenre:genre,
        })
    }

    SortPopularityDescending =()=>{
        let temp = this.state.movie

        temp.sort(function(a,b){
            return b.popularity -a.popularity
        })

        this.setState({
            movie:[...temp]
        })
    }

    SortPopularityAscending =()=>{
        let temp = this.state.movie

        temp.sort(function(a,b){
            return a.popularity -b.popularity
        })

        this.setState({
            movie:[...temp]
        })
    }
    SortRatingDescending =()=>{
        let temp = this.state.movie

        temp.sort(function(a,b){
            return b.vote_average - a.vote_average
        })

        this.setState({
            movie:[...temp]
        })
    }

    SortRatingAscending =()=>{
        let temp = this.state.movie

        temp.sort(function(a,b){
            return a.vote_average - b.vote_average
        })

        this.setState({
            movie:[...temp]
        })
    }
    render() {

        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
       let filterarr = []
       
       if(this.state.currenttext==""){
           filterarr= this.state.movie
       }else{
           filterarr = this.state.movie.filter((movieObj)=>{
               let title = movieObj.title.toLowerCase()
               return title.includes(this.state.currenttext.toLowerCase())
           })
       }

    //    if(this.state.currentgenre==="All genre"){
    //        filterarr= this.state.movie
    //    }
       if(this.state.currentgenre!="All genre"){
        filterarr = this.state.movie.filter((moviesObj)=>
                this.state.currentgenre ==genreids[moviesObj.genre_ids[0]]
           )
       }

        return (
            <div className='main'>
                <div className="row">
                    <div className='col-3' >
                        <ul class="list-group genre-selector">
                            {
                                this.state.genre.map((genre) => (
                                    this.state.currentgenre == genre ? <li style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }} class="list-group-item">{genre}</li> : <li style={{ color: '#3f51b5' }} onClick={()=>this.handlegenreChange(genre)} class="list-group-item">{genre}</li>
                                ))
                            }


                        </ul>

                    </div>

                    <div className='col-9 favourite-table'>
                        <div className='row'>
                            <input type="text" placeholder="Search" className='input-group-text col' value={this.state.currenttext} onChange={(e)=>this.setState({
                                currenttext:e.target.value
                            })} />
                            <input type="number" className='input-group-text col' />
                        </div>

                        <div className='row'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope='col'></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">genre</th>
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.SortPopularityDescending}></i>Popularity<i class="fa-solid fa-sort-down"  onClick={this.SortPopularityAscending}></i></th>
                                        <th scope="col"><i class="fa-solid fa-sort-up"  onClick={this.SortRatingDescending}></i>Ratings<i class="fa-solid fa-sort-down"  onClick={this.SortRatingAscending}></i></th>
                                        <th scope='col'></th>
                                    </tr>   
                                </thead>
                                <tbody>
                                    {
                                       filterarr.map((moviesObj) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`} style={{ height: '3rem', width: '4rem' }} alt="" /></td>
                                                <th scope="row">{moviesObj.title}</th>
                                                <td>{genreids[moviesObj.genre_ids[0]]}</td>
                                                <td>{moviesObj.popularity}</td>
                                                <td>{moviesObj.vote_average}</td>
                                                <td><button type="button" class="btn btn-danger">Delete</button></td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>

                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link">Previous</a></li>
                                <li class="page-item"><a class="page-link">1</a></li>
                                <li class="page-item"><a class="page-link">2</a></li>
                                <li class="page-item"><a class="page-link">3</a></li>
                                <li class="page-item"><a class="page-link">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
        )
    }
}

export default Favourites