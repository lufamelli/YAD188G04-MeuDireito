import React from 'react';
import Posts from '../posts';
import '../../css/buttons.css';
import '../../css/home.css';

export default function Home() {
  
  function goToRegister() {
    window.location.href= '/user/register'
  }

  function goToRegisterLawyer() {
    window.location.href= '/lawyer/register'
  }

  function goToLogin() {
    window.location.href= '/user'
  }
  return (
    <div className="containerHome">
      <div class="hero">
        <div class="heroContent">
          <div className="heroTitle"><h1>MEU DIREITO</h1></div>
          <div className="heroSubtitle">
            <h3>
              Você tem dúvidas relacionadas ao direito do consumidor? Encontre a sua dúvida pesquisando abaixo. 
            </h3>
          </div>
        </div>
      </div>
      <Posts />
    </div>
  );
}
