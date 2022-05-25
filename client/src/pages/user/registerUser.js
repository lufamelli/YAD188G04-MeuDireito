import React,{useState} from 'react';
import api from '../../services/api'
import '../../css/form.css';

export default function ResgisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  async function handleSubmit(event) {
    //conexão React - Node
    event.preventDefault() 
    const data = {
      firstName:firstName, 
      lastName:lastName, 
      email:email, 
      password:password,
      cPassword:cPassword
    }

    console.log(data)
    if(password !== cPassword){
      console.log('são diferentes', password, cPassword)
      alert('Senha e confirmação não conferem.')
    }
    else if(firstName !== '' && lastName !== '' && email !== '' && password!== '') {
      const response = await api.post('/user', data);
      if(response.status === 200) {
      window.location.href = '/user'
      console.log('status 200')
      alert('Usuário criado com sucesso.')
      console.log('entrou no status 200')
      } 
      else {
        alert('Email ja cadastrado.')
        console.log(response.status.message)
      }
    }
  }

  async function handleNoSubmit() {
    const data = {
      firstName:firstName, 
      lastName:lastName, 
      email:email, 
      password:password
    }

    if(firstName !== '' && lastName !== '' && email !== '' && password!== '') {
      const response = await api.post('/user', data);
      console.log(response.status);

      if(response.status === 403) {
        console.log('status 403')
        alert('Email ja cadstrado')
        }
    }
  }  
  return (
    <div className="container">
        <form className="resgisterForm" onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          <div className="inputField">
            <label htmlFor="">Nome</label>
            <input 
              className="formField" 
              name="firstName" 
              placeholder="Primeiro nome"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              type="text"
              required 
            />
          </div>
          <div className="inputField">
            <label htmlFor="">Sobrenome</label>
            <input 
              className="formField" 
              name="lastName" 
              placeholder="Sobrenome" 
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type="text" 
              required/>
          </div>
          <div className="inputField">
            <label htmlFor="">E-mail</label>
            <input 
              className="formField" 
              name="email" 
              placeholder="Seu melhor e-mail" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required/>
          </div>
          <div className="inputField">
            <label htmlFor="">Senha</label>
            <input 
              className="formField" 
              name="password" 
              placeholder="No mínimo 6 caracteres" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}/>
          </div>  
          <div className="inputField">
            <label htmlFor="">Confirmar Senha</label>
            <input className="formField" name="confirmPassword" 
              placeholder="Repita a senha a cima" type="password" required
              value={cPassword}
              onChange={e => setCPassword(e.target.value)}
              minLength={6}/>
          </div>
          <button className="btn btn-primary inputField" onClick={handleNoSubmit} type="submit">Criar conta</button>  
        </form>
    </div>
  );
}
