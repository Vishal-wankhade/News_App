import React from 'react'
import './navbar.css'
import gif from './images/w-global.gif'


function Navbar() {

  
    return (
      <div>
        <div className='menu'>
            <h2 className='name'>Lokbhushan News</h2>
            <div className='gif-w'>
              <img src={gif} alt='gif'/>
            </div>
        </div>

      </div>
      
    )
  }
export default Navbar;