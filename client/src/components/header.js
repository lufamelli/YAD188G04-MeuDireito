import React, { useState } from 'react'
import '../css/header.css';
import '../css/buttons.css';
import { getToken } from '../services/auth';

function Header() {
  const [isOpened, setIsOpened] = useState(false);

  function openMenu(event) {
    setIsOpened(current => !current) 
  }

  async function handleLogout() {
    if(window.confirm("Deseja sair?")) {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <div className="headerContainer">
      <div className="header">
        <button  className="btnMenu btn" onClick={openMenu} > {isOpened? 'X' : <img className="btnImage" src={require('../images/3linesbtn.png')} alt="MENU" />}</button>
      </div>
      {isOpened ?
        <div className="menuOpened">
          <div className="menuOption">
            <a href="/"><h3>Home</h3></a>
          </div>
          <div className="menuOption">
            <a href="/"><h3>Minhas dúvidas</h3></a>
          </div>
          <div className="menuOption">
            <a href="/lawyer/register"><h3>Criar perfil Advogado</h3></a>
          </div>
          <div className="menuOption">
            <a href="/user"><h3>Logar perfil Advogado</h3></a>
          </div>
          <div className="menuOption">
            <a href="/"><h3>Sobre O Meu Direito®</h3></a>
          </div>
          {getToken() ?
            <div className="menuOption">
              <a href="/" onClick={handleLogout}><h3>Sair</h3></a>
            </div> :
            <></>
          }
          
        </div>
      : 
      <>  </>
      }
    </div>
  )
}

export default Header