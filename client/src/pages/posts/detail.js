import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api';
import '../../css/detail.css';
import { getToken } from '../../services/auth';

export default function Detail(props) {
  const [post, setPost] = useState([]);

  let params = useParams()

  useEffect(() =>{
    async function loadPost(){
      const response = await api.get(`/post/${params._id}`);

      console.log('o response .data', response.data)
      setPost(response.data)
      console.log('o post ', post)
    }
    loadPost();
  }, [])
  return (
    <div className="container">
          <div className="postDetail">
            <h1 className="title">{post.title}</h1>
            <h3 className="subtitle">{post.subTitle}</h3>
            <p className="body">{post.body}</p>
            <div className="createQuestion">
            <h3>Ainda tem dúvida? Então <a href={getToken() ? `/question/create` : `/user`} className="highlight">clique aqui</a> para criar uma nova.</h3>
            </div>
          </div>
    </div>
  )
}
