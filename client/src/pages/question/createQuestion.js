import React, { useState } from 'react';
import api from '../../services/api';

export default function CreateQuestion() {
  const [questionTitle, setQuestionTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleLogout() {
    if(window.confirm("Deseja sair?")) {
      localStorage.clear()
      window.location.href = '/'
    }
  }      
  async function questionPublication(e) {
    e.preventDefault() 
    const data = {
      questionTitle: questionTitle,
      description: description,
    }

    if(questionTitle !== '' && description !== ''){
      const response = await api.post('/question/create', data);

      if(response.status === 200) {
        window.location.href = '/user/show'
        console.log('status 200')
        alert('Pergunta criada! Ela será analisada e lhe daremos o feedback.')
        }
        else {
        alert("Erro ao casdastrar pergunta")
        console.log('status 500')
        }
    }
  }
  return (
    <>
      <button onClick={handleLogout}>Sair</button>
      <div>Criar pergunta</div>
      <form className="resgisterForm" onSubmit={questionPublication}>
        <div className="inputForm">
          <input 
            className="formField" 
            name="questionTitle" 
            placeholder="Pergunta"
            value={questionTitle}
            onChange={e => setQuestionTitle(e.target.value)}
            type="text"
            required 
          />
        </div>
        <div className="inputField">
          <textarea
            cols="50" rows="5" 
            className="formField" 
            name="description" 
            placeholder="description" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="text" 
            required/>
        </div>
        <button className="btn btn-primary" type="submit">Publicar</button>
      </form>
      </>  
  )
}
