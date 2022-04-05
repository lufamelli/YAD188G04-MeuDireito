import React, { useState } from 'react';
import api from '../../services/api';

/*import {login, setIdUser, setNomeUser} from '../../services/auth'*/
export default function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    //conexao front-back para login user
    event.preventDefault() 
    console.log('entrou no handle')
    await api.post('/user/login', {email,password})
    .then(res => {
      if(res.status===200){
      console.log('entrou no 200')
        if(res.data.status===1){
          // login(res.data.token);
          //setIdUser(res.data._id)
          //setNomeUser(res.data.firstName)
          console.log('entrou no status 1')

          window.location.href= '/user/show'
        }
        else  {
          console.log('este status é ', res.data.status)
          alert('E-mail e/ou senha não conferem.')
        }
      }
      else if(res.data.status===2){
        console.log('Atenção: '+res.data.error)
      }
      else {
        alert('Erro no servidor');
      }
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form className="resgisterForm" onSubmit={handleSubmit}>
        <div className="inputField">
          <input 
            className="formField" 
            name="email" 
            placeholder="Digite seu email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required/>
        </div>
        <div className="inputField">
          <input 
            className="formField" 
            name="password" 
            placeholder="Digite sua senha" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required/>
        </div>  
        <button className="btn" type="submit">Entrar</button>
      </form>    
    </div>
  );
}
