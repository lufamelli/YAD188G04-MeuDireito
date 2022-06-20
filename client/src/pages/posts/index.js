import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../css/post.css';
import '../../css/buttons.css';
import { getToken } from '../../services/auth';

export default function Posts(props) {

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  //const [postId, setpostId] = useState([]);

  useEffect(() =>{
    async function loadPosts(){
      const response = await api.get(`/post/`);
      console.log(response.data)
      setPosts(response.data)
    }
    loadPosts();
  },[]);

  async function openPost(event){
    const urlId = await `/post/${event.currentTarget.id}`
    console.log(urlId)
    window.location.href = urlId
  }

async function handleOnSubmit(event) {
  event.preventDefault();
  const response = await api.get("/post");
  const posts = response.data
  console.log(posts);
  const result = posts.filter(post => post.title.toLowerCase().indexOf(searchText) !== -1);
  setPosts(result);
}
function buildSearch(event) {
setSearchText(event.target.value.toLowerCase());
}
  return(
    <div className="containerPost">
      <div className="search">
        <form className="formSearch" onSubmit={handleOnSubmit}>
          <input 
            placeholder="Pesquisa" 
            name="Pesquisa"
            value={searchText} 
            onChange={buildSearch}
            className="inputSearch"
          />
          <button className="btn-search">PESQUISAR</button>
        </form>  
      </div>
      <div className="posts">
        { 
          posts.map((post) => (
            <div className="post" key={post._id} id={post._id} onClick={openPost}>
              <h2>{post.title}</h2>
              <p>{post.subTitle}</p>
            </div>
          ))
        }
      </div>
      <h3>Não encontrou sua dúvida? Então <a href={getToken() ? `/question/create` : `/user`}  className="highlight">clique aqui</a> para criar uma nova.</h3>
    </div>
  )
}