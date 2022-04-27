import React,{useState} from 'react';
import api from '../../services/api'
export default function ResgisterLawyer() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [oabNumber, setOabNumber] = useState('')
  const [cpf, setCpf] = useState('')

  async function handleSubmit(e) {
    //conexão React - Node
    e.preventDefault() 
    const data = {
      firstName:firstName, 
      lastName:lastName, 
      email:email, 
      password:password,
      oabNumber:oabNumber,
      cpf:cpf
    }

    if(firstName !== '' && lastName !== '' && email !== '' && password!== '') {
      const response = await api.post('/user', data);

      if(response.status === 200) {
      window.location.href = '/user'
      console.log('status 200')
      alert('Usuário criado com sucesso.')
      }
      else {
      alert("Erro no casdastro de usuario")
      console.log('status 500')
      }
    }
  }
  return (
    <div>
      <h1>Cadastrar usuário</h1>
        <form className="resgisterForm" onSubmit={handleSubmit}>
          <div className="inputForm">
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
            <input 
              className="formField" 
              name="email" 
              placeholder="Email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required/>
          </div>
          <div className="inputField">
            <input 
              className="formField" 
              name="password" 
              placeholder="Senha" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required/>
          </div>  
          <div className="inputField">
            <input className="formField" name="confirmPassword" 
              placeholder="Confirmação de senha" type="password" required/>
          </div>
          <div className="inputField">
            <input className="formField" name="oabNumber" 
              value={oabNumber}
              onChange={e => setOabNumber(e.target.value)}
              placeholder="Número de OAB" type="text" required/>
          </div>
          <div className="inputField">
            <input className="formField" name="cpf" 
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              placeholder="CPF" type="text" required/>
          </div>
          <button className="btn" type="submit">Cadastrar</button>  
        </form>
    </div>
  );
}
