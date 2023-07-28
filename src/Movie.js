
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Movie.css'

function Movie() {
    const  [search,setSearch] = useState('star-wars')
    const [movies,setMovies] = useState([])

   async function fetchData(){
    try {
        const q = await axios.get(`https://www.omdbapi.com/?apikey=462a9076&s=${search}&type=movie`)
        // const articles = api.data.articles; // Access the articles property from the response data
        // setMovies(articles); // Update the data state with the fetched articles
        const r = q.data.Search;
        console.log(r.title)
        setMovies(r)
      } catch (err) {
        console.log(err);
      } finally {
        console.log("done");
      }
     
   }

   useEffect(() => {
    fetchData();
  }, [search]);


    return (
      <div className='wrap'>
        
         <input type='text' onChange={e => setSearch(e.target.value)}/>
      
      {
        movies.map((item) => (
            <div key={item.imdbID} className='m-box'>{item.Title}</div>
        )
        )
      }
    </div>
    )
  
}

export default Movie;
