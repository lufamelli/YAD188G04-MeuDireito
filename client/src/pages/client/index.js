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
  return (
    <div className="containerHome">
      <h1>Página inicial</h1>
      <button onClick={goToRegister} className="btn btn-primary">Cadastrar usuário</button>
      <button onClick={goToRegisterLawyer} className="btn btn-primary">Cadastrar advogado</button>
      <Posts />
    </div>
  );
}
