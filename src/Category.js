
import React,{useState,useEffect} from 'react'
import axios from 'axios';

function  Category() {
    const [cat,setCat] = useState("general")
    const [news, setNews] = useState([]);// Use useState to store the data
    const [country,setCountry] = useState("us");

    useEffect(() => {
        get(); // Call the fetchData function using useEffect
    
        // Set an interval to fetch new data every 15 seconds
      }, []);

      async function get(){
        try{
        const res = await axios.get("https://newsapi.org/v2/top-headlines?country={country}&category={Cat}&apiKey=0947a1ca99724eb195124bdc849677d8")
        const info = res.data.articles;
        setNews(info)
        }
        catch(err)
        {
        console.log(err)
        }
      }
    
  
    return (
        <div>
      {
        news.map((item,index)=>(
             <div key={index}>
                <p>{item.title}</p>
             </div>
        ))
      }
      </div>
    )
  

}
export default Category;
