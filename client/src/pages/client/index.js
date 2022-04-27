import React from 'react';
import Posts from '../posts';

export default function Home() {
  function goToLogin() {
    window.location.href= '/user'
  }
  
  function goToRegister() {
    window.location.href= '/user/register'
  }

  function goToRegisterLawyer() {
    window.location.href= '/lawyer/register'
  }
  return (
    <div>
      <h1>Página inicial</h1>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToRegister}>Cadastrar usuário</button>
      <button onClick={goToRegisterLawyer}>Cadastrar advogado</button>
      <Posts />
    </div>
  );
}
