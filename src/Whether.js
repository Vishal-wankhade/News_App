import axios from 'axios';
import './wether.css'
import cloud from './images/cloud.png'

// import Navbar from './Navbar'
import React,{ useEffect,useState } from 'react';

function Whether() {
  const [location, setLocation] = useState("");
  const [con, setCon] = useState("");

  useEffect(()=>{
    fetchInfo()
},[])

  async function fetchInfo() {
    try {
      const info = await axios.get("http://api.weatherapi.com/v1/current.json?key=718f255acc7047d79a1123356232307&q=India&aqi=no");
      const {location,current} = info.data;
     const x = current.condition.humidity;
    
    setLocation(location);
    setCon(x);
      
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  }
return(
   <div className='box'>
    <img src={cloud} alt="pic" className="icon"></img>
    <div>
    <p>Location : {location.name}</p>
     <p>Humidity : {con}</p>
    </div>
    
    
    
    
    </div>
);
}


export default Whether;