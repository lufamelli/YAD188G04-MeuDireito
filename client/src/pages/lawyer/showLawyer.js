import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {getNomeUser, getOab} from '../../services/auth'
import '../../css/question.css';
import '../../css/buttons.css';

export default function ShowLawyer() {
  console.log(getOab())
  
  const [questions, setQuestions] = useState([]);

  useEffect(() =>{
    async function loadQuestions(){
      
      const response = await api.get(`/question/`);
      console.log(response)
      setQuestions(response.data)
    }
    loadQuestions();
  },[]);

  function handelClick() {
    window.location.href= '/'
  }

  function goToCreatePost() {
    window.location.href= '/post/create'
  }

  async function answerQuestion(event) {
    const urlId = await `/post/create/${event.currentTarget.id}`
    console.log(urlId)
    window.location.href = urlId
  }

  return (
    <div className="containerQuestion">
      <div className="userName"><h1>Olá, {getNomeUser()} !</h1></div>      
      <button className="btn btn-primary" onClick={goToCreatePost}>Criar publicação</button>
      <div className="questions">
        { 
          questions.map((question) => (
            <div className="question" id={question._id}>
              <h2>{question.questionTitle}</h2>
              <p>{question.description}</p>
              <button className="btn-search" id={question._id} onClick={answerQuestion}>Responder pergunta</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
