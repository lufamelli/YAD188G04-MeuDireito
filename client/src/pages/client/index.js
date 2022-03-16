import React from 'react';

export default function Home() {
  function goToLogin() {
    window.location.href= '/user'
  }
  
  function goToRegister() {
    window.location.href= '/user/register'
  }
  return (
    <div>
      <h1>Página inicial</h1>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToRegister}>Cadastro</button>
    </div>
  );
}
