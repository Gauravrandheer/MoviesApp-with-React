import './App.css';
import Banner from './Components/Banner';
import Favourites from './Components/Favourites';
import MoviesList from './Components/MoviesList';
import Navbar from './Components/Navbar';

import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<> <Banner/> <MoviesList/></>}/>
        <Route path='/Favourites' element={<><Favourites/> </>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
