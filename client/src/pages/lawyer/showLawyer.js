import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {getNomeUser} from '../../services/auth'
import '../../css/post.css';
import '../../css/buttons.css';

export default function ShowLawyer() {

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

  return (
    <div>
      <div><h1>Olá, {getNomeUser()} !</h1></div>
      
      <button className="btn btn-primary" onClick={handelClick}>Voltar a Home</button>
      <button className="btn btn-primary" onClick={goToCreatePost}>Criar publicação</button>
      <div className="containerPost">
      <div className="posts">
        { 
          questions.map((question) => (
            <div className="post" id={question.id}>
              <h2>{question.questionTitle}</h2>
              <p>{question.description}</p>
              <button className="btn-search" >Responder pergunta</button>
            </div>
          ))
        }
      </div>
    </div>
    </div>
  );
}
