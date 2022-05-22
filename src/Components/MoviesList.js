import React, { Component } from 'react'

// import {movies} from "../movieData"

import axios from 'axios'

export class MoviesList extends Component {

    constructor(){
        super()

        this.state={
            hover:"",
            parr:[1],
            movies:[],
            currPage:1,
            favourite:[],
        }
    }

    async componentDidMount(){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=aea24c8ee4955a9ab5190c77795ad4c5&language=en-US&page=${this.state.currPage}`)
        let moviedata = res.data 
        console.log(moviedata   )
        this.setState({
            movies : [...moviedata.results],
        })
    }

    changeMovies =async()=>{
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=aea24c8ee4955a9ab5190c77795ad4c5&language=en-US&page=${this.state.currPage}`)
        let moviedata = res.data 
        console.log(moviedata   )
        this.setState({
            movies : [...moviedata.results],
        })
    }

    handleNext=()=>{
       let tempArr = []

       for(let i=1;i<=this.state.parr.length+1;i++){
           tempArr.push(i)
       }

       this.setState({
           parr:[...tempArr],
           currPage:this.state.currPage+1,
       },this.changeMovies)
    }


    handlePrevious=()=>{
        // let tempArr = [...this.state.parr]
      

        if(this.state.parr.length>1){
            // tempArr.pop()
            this.setState({
                // parr:[...tempArr],
                currPage:this.state.currPage-1,
            },this.changeMovies)
        }
 

     }

     handleCLick =(value)=>{
         if(this.state.currPage!=value){
             this.setState({
                 currPage:value,
             },this.changeMovies)
         }
     }

     handleFavourites =(movies)=>{
       let olddata = JSON.parse(localStorage.getItem('moviefavourites')||'[]')


       if(this.state.favourite.includes(movies.id)){
           olddata = olddata.filter((m)=>{
              return m.id!=movies.id
           })
           
       }else{
           olddata.push(movies)
       }
       localStorage.setItem('moviefavourites', JSON.stringify(olddata))
       this.handleFavouritesstate()

     }

     handleFavouritesstate=()=>{
        let olddata = JSON.parse(localStorage.getItem('moviefavourites')||'[]')

     let temp  = olddata.map((obj)=>(
         obj.id
     ))

     this.setState({
         favourite:[...temp],
     })
     }
  render() {

    // let moviesArr = movies.results
   
    return (
      <>
      <div>
          <h3 className='text-center'><strong>Trending</strong></h3>
      </div>
      
      <div className="movies-list">
          {
               this.state.movies.map((moviesObj)=>(
                <div className="card movie-card" onMouseEnter={()=>this.setState({hover:moviesObj.id})} onMouseLeave={()=>this.setState({hover:""})}>
                <img src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`}  className="card-img-top movie-img" style={{height:"40vh",width:"20vw "}} alt="..."/>
                <h5 className="card-title movie-title">{moviesObj.title}</h5>
                <div className='button-wrapper' style={{display:"flex",justifyContent:"center"}}>
                    {
                        this.state.hover==moviesObj.id && <button onClick ={()=>this.handleFavourites(moviesObj)} href='' class="btn btn-primary movie-button text-center ">{this.state.favourite.includes(moviesObj.id)?"Remove from favourites":"Add to favourites"}</button>
                    }
               
                </div>
                </div>
               ))
          }
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a class="page-link"  onClick={this.handlePrevious} style={{cursor:"pointer"}}>Previous</a></li>
   {
       this.state.parr.map((value)=>{
       return <li className="page-item"><a className="page-link" style={{cursor:"pointer"}} onClick={()=>this.handleCLick(value)}>{value}</a></li>
       })
   }
    <li className="page-item"><a className="page-link" style={{cursor:"pointer"}} onClick={this.handleNext} >Next</a></li>
  </ul>
</nav>
      </div>
      </>
    )
  }
}

export default MoviesList
