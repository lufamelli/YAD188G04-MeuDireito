import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api';
import '../../css/detail.css';

export default function Details(props) {
  const [question, setQuestion] = useState([]);

  let params = useParams()

  useEffect(() =>{
    async function loadquestion(){
      const response = await api.get(`/question/${params._id}`);

      console.log('o response .data', response.data)
      setQuestion(response.data)
      console.log('o question ', question)
    }
    loadquestion();
  }, [])
  return (
    <div className="container">
          <div className="questionDetail">
            <h1 className="title">{question.questionTitle}</h1>
            <h3 className="subtitle">{question.description}</h3>
          </div>
    </div>
  )
}
