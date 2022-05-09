import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './postStyle.css';

export default function Posts(props) {

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() =>{
    async function loadPosts(){
      const response = await api.get("/post");
      console.log(response)
      setPosts(response.data)
    }
    loadPosts();
  },[]);

async function handleOnSubmit(event) {
  event.preventDefault();
  const response = await api.get("/post");
  const posts = response.data
  console.log(posts);
  const result = posts.filter(post => post.title.toLowerCase().indexOf(searchText) !== -1);
  console.log(result);
  setPosts(result);
}
function buildSearch(event) {
setSearchText(event.target.value.toLowerCase());
}
  return(
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input 
            placeholder="Pesquisa" 
            name="search"
            value={searchText} 
            onChange={buildSearch}
            className="search" 
          />
          <button>search</button>
        </form>  
      </div>
      <div>
      {
        posts.map((post) => (
          <div className="postHeadlines" key={post._id}>
            <div>{post.title}</div>
            <div>{post.subTitle}</div>
          </div>
        ))
      }
      </div>
    </>
  )
}