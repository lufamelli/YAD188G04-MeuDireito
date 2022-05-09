import React from 'react';
import {getNomeUser} from '../../services/auth'

export default function ShowLawyer() {

  function handelClick() {
    window.location.href= '/'
  }

  function goToCreatePost() {
    window.location.href= '/post/create'
  }

  return (
    <div>
      <div><h1>Bem vindo(a) {getNomeUser()} !</h1></div>
      
      <button onClick={handelClick}>Voltar a Home</button>
      <button onClick={goToCreatePost}>Criar publicação</button>
    </div>
  );
}
