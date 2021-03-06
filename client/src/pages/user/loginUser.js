import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../../services/api';
//import { AuthLogin } from '../../services/authLogin';
import {setIdUser, setNomeUser, login, setOab, getOab} from '../../services/auth';
import '../../css/form.css';

/*import {login, setIdUser, setNomeUser} from '../../services/auth'*/
export default function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('');

  //const { setAuth } = useContext(AuthLogin);
  const userRef = useRef();
  const errorRef = useRef();
  
    useEffect(() => {
      userRef.current.focus();
  }, []) // só acontece quando o componente carrega, porque nao tem nada nos colchetes

  useEffect(() => {
    setErrorMsg('');
  }, [email, password])
  
  async function handleSubmit(event) {
    //conexao front-back para login user
    event.preventDefault() 
    await api.post(`/user/login/`, {email,password}, 
    /*{
      headers: {'Content-Type' : 'application/json'},
      withCredentials: true
    }*/)
    .then(res => {
      if(res.status===200){
      console.log('entrou no 200')
        if(res.data.status===1){
          login(res.data.token);
          setIdUser(res.data._id)
          setNomeUser(res.data.firstName)
          setOab(res.data.oabNumber)
          const oab = getOab() 
          console.log(oab)
          console.log('entrou no status 1', oab)
          if( oab === 'undefined' ){
            window.location.href= '/user/show'
            console.log('usuario', oab)
          }
          else {
            window.location.href= '/lawyer/show'
            console.log('advogado', oab)
          }
        }
        else if(res.data.status===2){
          alert(res.data.error)
          console.log('Atenção: '+res.data.error + res.data.status)
        }
        
    }    
        else {
          alert('Erro no servidor');
        }
    })
  }
  return (
    <div className="container">
      <form className="resgisterForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="inputField">
          <label htmlFor="">E-mail</label>
          <input 
            className="formField" 
            name="email" 
            placeholder="Digite seu email cadastrado" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            ref={userRef}
            required/>
        </div>
        <div className="inputField">
            <label htmlFor="">Senha</label>
          <input 
            className="formField" 
            name="password" 
            placeholder="Digite sua senha" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required/>
        </div>  
        <button className="btn btn-primary" type="submit">Entrar</button>
        <h4>Ainda não tem conta? <a href="/user/register" className="highlight">Crie uma aqui!</a></h4>
        <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
      </form>    
    </div>
  );
}
