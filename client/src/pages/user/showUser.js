import React from 'react';
import {getNomeUser, getToken, logout} from '../../services/auth'
import api from '../../services/api';
import Posts from '../posts';

export default function ShowUser() {

  function handleClick() {
    window.location.href= '/question/create'
  }

  async function handleLogout() {
    if(window.confirm("Deseja sair?")) {
      localStorage.clear()
      window.location.href = '/'
      /*const response = await api.get("/user/logout", {headers: {token: getToken()}})
      if(response.status ===200) {
        logout();
        window.location.href = '/user/login'
      }
      else {
        alert("Erro no logout, status: " + response.status)
      }*/
    }
  }
  return (
    <div>
      <div><h1>Olá, {getNomeUser()}!</h1></div>
      <button className="btn btn-primary" onClick={handleClick}>Criar pergunta</button>
      <button className="btn btn-primary" onClick={handleLogout}>Sair</button>
      <Posts />
    </div>
  );
}
