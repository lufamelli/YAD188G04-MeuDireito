import React from 'react'
import '../css/header.css';
import '../css/buttons.css';

function Header() {
  return (
    <div className="headerContainer">
      <button className="btn btnMenu"><img className="btnImage" src={require('../images/3linesbtn.png')} alt="MENU" /></button>
    </div>
  )
}

export default Header