import React from 'react';
import {getNomeUser} from '../../services/auth'

export default function ShowUser() {

  function handelClick() {
    window.location.href= '/'
  }
  return (
    <div>
      <div><h1>Bem vindo {getNomeUser()}!</h1></div>
      
      <button onClick={handelClick}>Voltar a Home</button>
    </div>
  );
}
