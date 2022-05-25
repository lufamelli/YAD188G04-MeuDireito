import React, { useState } from 'react';
import api from '../../services/api';


function CreatePost() {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [body, setBody] = useState('')

  function handelClick() {
    window.location.href= '/'
  }

  async function postPublication(e) {
    e.preventDefault() 
    const data = {
      title: title,
      subTitle: subTitle,
      body: body
    }

    if(title !== '' && subTitle !== '' && body !== '') {
      const response = await api.post('/post/create', data);

      if(response.status === 200) {
        window.location.href = '/post'
        console.log('status 200')
        alert('Post criado com sucesso.')
        }
        else {
        alert("Erro ao casdastrar post")
        console.log('status 500')
        }
    }
  }

  return (
    <>
      <h1>Criar post</h1>
      <form className="resgisterForm" onSubmit={postPublication}>
        <div className="inputForm">
          <input 
            className="formField" 
            name="title" 
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            required 
          />
        </div>
        <div className="inputField">
          <input 
            className="formField" 
            name="subtitle" 
            placeholder="Subtitulo" 
            value={subTitle}
            onChange={e => setSubTitle(e.target.value)}
            type="text" 
            required/>
        </div>
        <div className="inputField">
          <input 
            className="formField" 
            name="text" 
            placeholder="Corpo" 
            value={body}
            onChange={e => setBody(e.target.value)}
            type="text"
            required/>
        </div>
        <button className="btn" type="submit">Publicar</button>
        <button onClick={handelClick}>Voltar a Home</button>
      </form>
    </>
  )
}

export default CreatePost;